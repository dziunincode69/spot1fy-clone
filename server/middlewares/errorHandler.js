const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  console.log(err.message);
  switch (err.name) {
    case "JsonWebTokenError":
      return res.status(400).json({
        message: err.message,
      });
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({
        message: err.message,
      });
    case "SequelizeValidationError":
      return res.status(400).json({
        message: err.message.replace("Validation error: ", ""),
      });
    case "ValidateInput":
      return res.status(400).json({
        message: err.message,
      });
    case "WrongLogin":
      return res.status(401).json({
        message: err.message,
      });
    case "WebapiRegularError":
      return res.status(400).json({
        messsage: err.message,
      });
    case "NotPremium":
      return res.status(401).json({
        message: err.message,
      });
    default:
      return res.status(500).json({
        message: "Internal server error",
      });
      break;
  }
};

module.exports = errorHandler;
