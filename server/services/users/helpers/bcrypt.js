const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashing = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparing = (inputPassword, dbHash) => {
  const returnComparison = bcrypt.compareSync(inputPassword, dbHash);
  return returnComparison;
};

module.exports = { hashing, comparing };
