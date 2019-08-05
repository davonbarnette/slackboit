'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ToBeFair = sequelize.define('ToBeFair', {
    uuid: {type: DataTypes.UUID, primaryKey:true, defaultValue:Sequelize.UUIDV1},
  }, {
    underscored:true,
    sequelize,
    indexes: [{unique: true, fields: ['uuid']}],
  });
  ToBeFair.associate = function(models) {
    ToBeFair.belongsTo(models.User, {foreignKey:'user_uuid'});
  };
  return ToBeFair;
};