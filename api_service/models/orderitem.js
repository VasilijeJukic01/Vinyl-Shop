'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Song, Order}) {
      this.belongsTo(Song, {foreignKey: "song_id", as: "songs"});
	  this.belongsTo(Order, {foreignKey: "order_id", as: "orders"});
    }
  }

  OrderItem.init({
	order_id: {
		type: DataTypes.INTEGER,
		unique: true,
		allowNull: false
	},
	song_id: {
		type: DataTypes.INTEGER,
		unique: true,
		allowNull: false
	},
	command: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
    price: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;

};