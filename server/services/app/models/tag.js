"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, { foreignKey: "postId" });
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cannot be null",
          },
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
