'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderItem}) {
      this.hasMany(OrderItem, {foreignKey: "order_id", as: "items"});
    }
  }

  Order.init({
	order_time: {
		type: DataTypes.DATE,
		allowNull: false
	},
	schedule_time: {
		type: DataTypes.DATE,
		allowNull: false
	},
    status: {
		type: DataTypes.STRING(120),
		allowNull: false
	},
	address: {
		type: DataTypes.STRING(120),
		allowNull: false
	},
	phone: {
		type: DataTypes.STRING(15),
		allowNull: false
	},
	name_surname: {
		type: DataTypes.STRING(120),
		allowNull: false
	},
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;

};