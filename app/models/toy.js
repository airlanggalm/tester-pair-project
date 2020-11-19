'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Toy.hasMany(models.UserCart, {
        sourceKey: 'id',
        foreignKey: 'toyId'
      })
    }

    getPriceRp() {

      return `Rp. ${this.price.toLocaleString('id')}`
    }
  };
  Toy.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    color: DataTypes.STRING,
    company: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Toy',
  });
  return Toy;
};