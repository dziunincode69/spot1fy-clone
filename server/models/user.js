"use strict";
const { Model } = require("sequelize");
const { hashBcrypt, generateJWT } = require("../helpers/jwtbcrypt");
const sendVerification = require("../helpers/nodemailer");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        unique: {
          args: true,
          msg: "Please input unique email",
        },
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email cannot empty",
          },
          notNull: {
            msg: "Email cannot empty",
          },
          isEmail: {
            msg: "Please input correct Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password cannot empty",
          },
          notNull: {
            msg: "password cannot empty",
          },
        },
      },
      ispremium: {
        type: DataTypes.BOOLEAN,
      },
      verificationCode: DataTypes.INTEGER,
      isVerified: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        async beforeCreate(arg) {
          const randomNumber = Math.floor(Math.random() * 50) + 10;

          arg.ispremium = false;
          arg.isVerified = false;
          arg.verificationCode = randomNumber;
          arg.password = hashBcrypt(arg.password);
          const payload = {
            verificationCode: randomNumber,
            email: arg.email,
          };
          const token = generateJWT(payload);
        },
      },
    }
  );
  return User;
};
