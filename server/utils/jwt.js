const redis = require("./redis");

const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);
const accessTokenOptions = {
  expire: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: true,
};
const refreshTokenOptions = {
  expire: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};
const sendToken = (user, statusCode, res) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();
  redis.set(user._id, JSON.stringify(user));

  if (process.env.NODE_ENV == "production") {
    accessTokenOptions.secure = true;
  }
  res.cookie("access_token", accessToken);
  res.cookie("refresh_token", refreshToken);
  res.status(statusCode).json({ success: true, auth: { user, accessToken } });
};
module.exports = {
  sendToken,
};
