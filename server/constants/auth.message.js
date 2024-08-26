const authMsg = {
  FAILED_LOGIN: "Please enter your email and password",
  EXIST_USER: "User already exists",
  iNVALID_CODE: "Invalid activation code",
  SUCCESS_REGISTRATION: (e) => `Check your email: ${e} for confirmation code`,
  NOT_FOUND_USER_LOGIN: "Invalid email or password",
  ERROR_SEND_CODE: "Error sending email",
};
module.exports = { authMsg };
