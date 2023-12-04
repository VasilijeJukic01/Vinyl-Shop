'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Feature, OrderItem}) {
      this.belongsTo(Category, {foreignKey: "category_id", as: "categories"});
	  this.hasMany(OrderItem, {foreignKey: "song_id", as: "items"});
	  this.belongsToMany(Feature, {foreignKey: "song_id", as: "features", through:"SongFeature"});
    }
  }

  Song.init({
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
		type: DataTypes.STRING(120),
		unique: true,
		allowNull: false
	},
    performer: {
		type: DataTypes.STRING(120),
		allowNull: true
	}, 
    description: {
		type: DataTypes.STRING(120),
		allowNull: false
	},
    price: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;

};