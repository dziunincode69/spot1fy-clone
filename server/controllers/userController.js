const {
  generateJWT,
  compareBcrypt,
  validateJWT,
} = require("../helpers/jwtbcrypt");
const sendVerification = require("../helpers/nodemailer");
const { User } = require("../models/index");
class UserController {
  static async registerAccount(req, res, next) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "ValidateInput",
          message: "Email cannot blank",
        };
      }
      if (!password) {
        throw {
          name: "ValidateInput",
          message: "Password cannot blank",
        };
      }
      const { body } = req;
      const createAccount = await User.create(body);
      const payload = {
        id: createAccount.id,
        email: createAccount.email,
        isVerified: createAccount.isVerified,
      };
      const payloadEmail = {
        id: createAccount.id,
        verificationCode: createAccount.verificationCode,
        email: createAccount.email,
      };
      const access_token = generateJWT(payload);
      const emailBody = generateJWT(payloadEmail);
      sendVerification(createAccount.email, emailBody);
      payload.access_token = access_token;
      payloadEmail.access_token = access_token;
      return res.status(201).json(payload);
    } catch (error) {
      next(error);
    }
  }
  static async loginAccount(req, res, next) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      // console.log(em)
      if (!email) {
        throw {
          name: "ValidateInput",
          message: "Email cannot blank",
        };
      }
      if (!password) {
        throw {
          name: "ValidateInput",
          message: "Password cannot blank",
        };
      }
      const findOne = await User.findOne({
        where: {
          email,
        },
      });
      if (!findOne) {
        throw {
          name: "WrongLogin",
          message: "Wrong Email / Password",
        };
      }
      if (!findOne.isVerified) {
        throw {
          name: "WrongLogin",
          message: "Email not yet verified",
        };
      }
      const compare = compareBcrypt(password, findOne.password);

      if (!compare) {
        throw {
          name: "WrongLogin",
          message: "Wrong Email / Password",
        };
      }
      const payload = {
        id: findOne.id,
        email: findOne.email,
        isPremium: findOne.ispremium,
      };
      const token = generateJWT(payload);
      payload.access_token = token;
      res.status(200).json(payload);
    } catch (error) {
      next(error);
    }
  }
  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const decodeToken = validateJWT(token);
      if (!decodeToken || !token) {
        throw {
          name: "VerificationError",
          message: "Invalid Token Verification",
        };
      }
      const findUser = await User.findOne({
        where: {
          email: decodeToken.email,
        },
      });
      if (!findUser) {
        throw {
          name: "VerificationError",
          message: "Invalid Token Verification",
        };
      }
      const correctUserVerificationCode = findUser.verificationCode;
      const verificationFromToken = decodeToken.verificationCode;
      if (verificationFromToken !== correctUserVerificationCode) {
        throw {
          name: "VerificationError",
          message: "Invalid Token Verification",
        };
      }
      const updateUser = await findUser.update({
        isVerified: true,
      });
      res.redirect("http://localhost:5174/?verified=true");
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
