'use strict';

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Letter = sequelize.define('Letter', {
    uuid: {type: DataTypes.UUID, primaryKey:true, defaultValue:Sequelize.UUIDV1},
    letter: DataTypes.STRING,
    word: DataTypes.STRING,
  }, {
    underscored:true,
    sequelize,
    indexes: [{unique: true, fields: ['uuid']}],
  });
  Letter.associate = function(models) {
    Letter.belongsTo(models.User, {foreignKey:'user_uuid'});
  };
  return Letter;
};