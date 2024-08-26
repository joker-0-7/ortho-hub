const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URL || "";
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports = { connectDB };
