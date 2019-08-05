'use strict';

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const EatMeDaddy = sequelize.define('EatMeDaddy', {
    uuid: {type: DataTypes.UUID, primaryKey:true, defaultValue:Sequelize.UUIDV1},
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    underscored:true,
    sequelize,
    indexes: [{unique: true, fields: ['uuid']}],
  });
  EatMeDaddy.associate = function(models) {
    EatMeDaddy.belongsTo(models.User, {foreignKey:'user_uuid'});
  };
  return EatMeDaddy;
};