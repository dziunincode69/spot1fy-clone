const { validateJWT } = require("../helpers/jwtbcrypt");

const Authentication = (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const validate = validateJWT(access_token);
    req.user = validate;
    next();
  } catch (error) {
    next(error);
  }
};

const IsPremium = (req, res, next) => {
  try {
    const { isPremium } = req.user;
    if (!isPremium) {
      throw {
        name: "NotPremium",
        message: "Only Premium Content",
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { Authentication, IsPremium };
