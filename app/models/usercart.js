'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCart.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      })
      
      UserCart.belongsTo(models.Toy, {
        foreignKey: 'toyId',
        targetKey: 'id'
      })
    }
  };
  UserCart.init({
    userId: DataTypes.INTEGER,
    toyId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCart',
  });
  return UserCart;
};