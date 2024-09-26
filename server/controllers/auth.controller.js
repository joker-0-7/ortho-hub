const { CatchAsyncError } = require("../middlewares/CatchAsyncError");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { ErrorHandler } = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const sendMail = require("../utils/sendMail");
const path = require("path");
const { sendToken } = require("../utils/jwt");
const { authMsg } = require("../constants/auth.message");
const { createActivationToken } = require("../utils/createActivation");
const { default: mongoose } = require("mongoose");
const register = CatchAsyncError(async (req, res, next) => {
  const templatePath = path.join(__dirname, "../mails/activation-mail.ejs");
  try {
    const { firstName, lastName, email, password } = req.body;
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler(authMsg.EXIST_USER, 400));
    }
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.firstName }, activationCode };
    const html = await ejs.renderFile(templatePath, data);
    try {
      await sendMail({
        email: user.email,
        subject: "Account activation",
        template: "activation-mail.ejs",
        data,
      });
      return res.status(200).json({
        message: authMsg.SUCCESS_REGISTRATION(user.email),
        activationToken: activationToken.token,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(authMsg.ERROR_SEND_CODE, 400));
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const activateUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { activation_token, activation_code } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler(authMsg.iNVALID_CODE, 400));
    }
    const { firstName, lastName, email, password } = newUser.user;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return next(new ErrorHandler(authMsg.EXIST_USER, 400));
    }
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler(authMsg.FAILED_LOGIN, 400));
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler(authMsg.NOT_FOUND_USER_LOGIN, 400));
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch)
      return next(new ErrorHandler(authMsg.NOT_FOUND_USER_LOGIN, 400));
    user.password = undefined;
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const current = async (req, res) => {
  if (req.current?.type === "free") return res.status(200).json({ ok: true });

  try {
    const user = await userModel.findById(req.current.id);
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    return res.status(400);
  }
};

// Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(404)
      .json({ msg: "Please provide username and password" });
  try {
    let user = await userSchema.findOne({ email });
    if (!user)
      return res.status(401).json({ msg: "This User Is Not Registered" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(404).json({ msg: "Invalid Password" });
    if (user.role === "admin")
      return res
        .status(401)
        .json({ msg: "Unauthorized - Admin only resource" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    return res.status(200).json({ token, user: user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const freeTrail = async (req, res) => {
  const id = new mongoose.Types.ObjectId();
  const accessToken = jwt.sign(
    { id: id.toString(), type: "free" },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "1d",
    }
  );
  return res.status(201).json({
    user: {
      _id: id,
      firstName: "Free",
      lastName: "Trail",
      email: "free@trail.com",
      isVerified: true,
      role: "free",
    },
    accessToken,
  });
};

const sendPassword = CatchAsyncError(async (req, res, next) => {
  const templatePath = path.join(__dirname, "../mails/reset-password-mail.ejs");
  try {
    const email = req.body.email;
    const existEmail = await userModel.findOne({ email });
    if (!existEmail) return next(new ErrorHandler("Email not found", 400));
    const activationToken = createActivationToken(existEmail);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: existEmail.firstName }, activationCode };
    const html = await ejs.renderFile(templatePath, data);
    try {
      await sendMail({
        email: email,
        subject: "Account activation",
        template: "reset-password-mail.ejs",
        data,
      });
      return res.status(200).json({
        message: authMsg.SUCCESS_REGISTRATION(email),
        activationToken: activationToken.token,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(authMsg.ERROR_SEND_CODE, 400));
    }
  } catch (error) {
    console.log(error);
  }
});

const confirmCode = CatchAsyncError(async (req, res, next) => {
  try {
    const { activation_token, activation_code, password } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler(authMsg.iNVALID_CODE, 400));
    }
    const { email } = newUser.user;
    const existUser = await userModel.findOne({ email });
    console.log(activation_token, activation_code);
    if (!existUser) {
      return next(new ErrorHandler(authMsg.EXIST_USER, 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.findOneAndUpdate(
      { email },
      { password: hash }
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
module.exports = {
  register,
  activateUser,
  loginUser,
  current,
  loginAdmin,
  freeTrail,
  sendPassword,
  confirmCode,
};
