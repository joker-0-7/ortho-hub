var express = require("express");
const {
  register,
  activateUser,
  loginUser,
  current,
  freeTrail,
} = require("../controllers/auth.controller");
const {
  createOrder,
  captureOrder,
} = require("../controllers/payment.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const {
  getUsers,
  getSolvedCount,
  resetInformation,
  updatePassword,
  getUsersCount,
  changeStatus,
  search,
  getUser,
  updateUser,
  deleteUser,
  getActiveUserCount,
  contactUs,
  contactUsCount,
  getAllContactUs,
  contactUsOne,
  deleteMessage,
} = require("../controllers/user.controller");
const {
  getQuestionsCount,
  previousQuestions,
  previousQuestion,
  lastUsers,
} = require("../controllers/questions.controller");
const checkSubscription = require("../middlewares/checkSubscription");
var router = express.Router();

router.post("/register", register);
router.post("/activation", activateUser);
router.post("/login", loginUser);
router.post("/create-order", createOrder);
router.post("/capture-order", captureOrder);
router.post("/reset-information", verifyToken, resetInformation);
router.patch("/update-password", verifyToken, updatePassword);
router.get("/all/:current/:pre", verifyToken, isAdmin, getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", verifyToken, isAdmin, updateUser);
router.delete("/user/:id", verifyToken, isAdmin, deleteUser);
router.get("/count", verifyToken, isAdmin, getUsersCount);
router.get("/questions-count", verifyToken, getQuestionsCount);
router.get("/solved-count", verifyToken, getSolvedCount);
router.get(
  "/previous-questions/:type/:current/:perPage",
  verifyToken,
  previousQuestions
);
router.get("/previous-question/:id", verifyToken, previousQuestion);
router.get("/user-active-count", verifyToken, isAdmin, getActiveUserCount);
router.get("/last-users", verifyToken, isAdmin, lastUsers);
router.get("/current", verifyToken, checkSubscription, current);
router.post("/free-trial", freeTrail);
router.post("/change-status/:id", verifyToken, isAdmin, changeStatus);
router.post("/contact-us", contactUs);
router.get("/contact-us/:current/:pre", verifyToken, isAdmin, getAllContactUs);
router.get("/contact-us/:id", verifyToken, isAdmin, contactUsOne);
router.delete("/contact-us/:id", verifyToken, isAdmin, deleteMessage);
router.get("/contact-count/", verifyToken, isAdmin, contactUsCount);
router.get("/search/:query", search);

module.exports = router;
