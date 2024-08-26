const moment = require("moment");
const userModel = require("../models/user.model");

const checkSubscription = async (req, res, next) => {
  const userId = req.current.id;
  if (req.current?.type === "free") return next();
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Subscription has ended. Please renew to continue." });
    }
    const currentDate = moment();
    const subscriptionEndDate = moment(user.subscriptionEnd);
    if (currentDate.isAfter(subscriptionEndDate)) {
      user.isVerified = false;
      await user.save();
      return res
        .status(401)
        .json({ message: "Subscription has ended. Please renew to continue." });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = checkSubscription;
