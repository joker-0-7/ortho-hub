const paypal = require("@paypal/checkout-server-sdk");
const { CatchAsyncError } = require("../middlewares/CatchAsyncError");
const { client } = require("../utils/paypalConfig");
const payMsg = require("../constants/pay.message");
const userModel = require("../models/user.model");
const sendMail = require("../utils/sendMail");
const path = require("path");
const ejs = require("ejs");

const createOrder = CatchAsyncError(async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "GBP",
          value: "68.00",
        },
      },
    ],
  });
  try {
    const order = await client.execute(request);
    const approvalLink = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;
    return res.json({ id: order.result.id, approvalLink });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: payMsg.ERROR_PAYMENT });
  }
});
const captureOrder = async (req, res, next) => {
  const templatePath = path.join(__dirname, "../mails/subscription-mail.ejs");
  const today = new Date().toISOString().split("T")[0];
  const { orderID, userID } = req.body;
  if (!orderID || !userID) {
    return res
      .status(400)
      .json({ msg: "Invalid request. OrderID and UserID are required." });
  }
  const request = new paypal.orders.OrdersCaptureRequest(orderID);

  request.requestBody({});
  try {
    const capture = await client.execute(request);
    const user = await userModel.findById(userID);
    if (user) {
      user.isVerified = true;
      user.isReset = false;
      user.subscriptionEnd = new Date();
      user.subscriptionEnd.setMonth(user.subscriptionEnd.getMonth() + 3);
      await user.save();
    } else {
      return res.status(404).json({ msg: "User not found." });
    }
    const data = {
      user: {
        name: user.firstName,
        subscriptionEnd: user.subscriptionEnd,
        subscriptionStart: today,
        pay: 90,
        id: capture.result.id,
      },
    };

    const html = await ejs.renderFile(templatePath, data);
    try {
      await sendMail({
        email: user.email,
        subject: "Account subscription",
        template: "subscription-mail.ejs",
        data,
      });
    } catch (error) {
      console.log(error);
    }
    return res.json({ data: capture.result, success: true, user });
  } catch (err) {
    console.error("Error capturing order:", err);
    return res.status(500).json({
      msg: "Error processing payment.",
      error: err.message,
      details: err.response ? err.response.details : null,
      debug_id: err.response ? err.response.debug_id : null,
    });
  }
};

module.exports = {
  createOrder,
  captureOrder,
};
