const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("users");
    return users;
  }

  static async findAll() {
    return this.getCollections()
      .find({}, { projection: { password: 0 } })
      .toArray();
  }

  static async createUser(user) {
    return this.getCollections().insertOne({
      email: user.email,
      username: user.username,
      password: user.password,
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }

  static async findById(objectId) {
    return this.getCollections().findOne(
      {
        _id: new ObjectId(objectId),
      },
      { projection: { password: 0 } }
    );
  }

  static async findOne({ key }) {
    return this.getCollections().findOne(
      {
        key,
      },
      { projection: { password: 0 } }
    );
  }

  static async deleteById(objectId) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(objectId),
    });
  }
}

module.exports = User;
