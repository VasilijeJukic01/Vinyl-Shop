'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Song, Feature}) {
      this.belongsTo(Song, {foreignKey: "song_id", as: "song"});
      this.belongsTo(Feature, {foreignKey: "feature_id", as: "features"});
    }
  }

  SongFeature.init({
    song_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
    feature_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
  }, {
    sequelize,
    modelName: 'SongFeature',
  });
  return SongFeature;

};