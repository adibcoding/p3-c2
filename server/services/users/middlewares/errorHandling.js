function errorHandling(err, req, res, next) {
  let statusCode = 0;
  let message = "";
  console.log(err);
  switch (err.name) {
    case "loginError":
      statusCode = 401;
      message = "Invalid email/password";
      break;
    case "InvalidInput":
      statusCode = 401;
      message = "Invalid Input";
      break;
    case "NotFound":
      statusCode = 404;
      message = "Not Found";
      break;
    case "BSONError":
      statusCode = 400;
      message = "BSON Error";
      break;
    default:
      statusCode = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(statusCode).json({
    message,
  });
}

module.exports = errorHandling;
