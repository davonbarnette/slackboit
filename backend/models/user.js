'use strict';
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {type: DataTypes.STRING, primaryKey:true, defaultValue:Sequelize.UUIDV1},
    display_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    underscored:true,
    sequelize,
    indexes: [{unique: true, fields: ['uuid']}],
  });
  User.associate = function(models) {
    User.hasMany(models.ToBeFair, {foreignKey:'user_uuid'});
    User.hasMany(models.EatMeDaddy, {foreignKey:'user_uuid'});
  };
  return User;
};