const { generateOrder } = require("../helpers/midtrans");
const { User, Transaction } = require("../models");
class MidtransController {
  static async getPayment(req, res, next) {
    try {
      const order = await generateOrder();
      res.status(200).json({
        orderid: order[1],
        token: order[0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyPayment(req, res, next) {
    try {
      const email = req.user.email;
      const { orderid } = req.query;
      const update = await User.update(
        { ispremium: true },
        { where: { email } }
      );
      const insert = await Transaction.create({
        userId: req.user.id,
        urlTransaction: orderid,
      });
      res.status(200).json({ message: "Payment Success" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MidtransController;
