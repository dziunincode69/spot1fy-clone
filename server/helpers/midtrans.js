const axios = require("axios");
const { User } = require("../models");
async function generateOrder() {
  const date = Date.now();
  const orderid = "order-" + date;
  console.log(orderid);
  try {
    const response = await axios.post(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      // '\n{\n  "transaction_details": {\n    "order_id": "order-id",\n    "gross_amount": 10000\n  },\n  "credit_card": {\n    "secure": true\n  }\n}\n',
      {
        transaction_details: {
          order_id: orderid,
          gross_amount: 1000,
        },
        credit_card: {
          secure: false,
        },
      },
      {
        headers: {
          accept: "application/json",
          authorization:
            "Basic U0ItTWlkLXNlcnZlci1pU19mb01hdjBnVm44OG96OFFvMWxtRFg6",
          "content-type": "application/json",
        },
      }
    );
    return [response.data.token, orderid];
  } catch (error) {
    console.log(error);
  }
}
module.exports = { generateOrder };
