const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "unauthenticated" };
    }

    const payload = verifyToken(access_token);

    const user = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });

    if (!user) {
      throw { name: "unauthenticated" };
    }

    req.extra = {
      userId: user.id,
      role: user.role,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
