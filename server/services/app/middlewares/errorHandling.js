function errorHandling(err, req, res, next) {
  console.log(err);
  let statusCode = 0;
  let message = "";
  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;

      const errArr = err.errors.map((el) => {
        return el.message;
      });
      message = errArr.join(", ");

      break;
    case "AggregateError":
      statusCode = 400;
      message = "All tags can't be empty";
      break;
    case "loginError":
      statusCode = 401;
      message = "Invalid email/password";
      break;
    case "NotFound":
      statusCode = 404;
      message = "Item not found";
      break;
    case "SequelizeUniqueConstraintError":
      statusCode = 409;
      message = "Email in use";
      break;

    default:
      statusCode = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(statusCode).json({ message });
}

module.exports = errorHandling;
