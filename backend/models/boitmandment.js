'use strict';
module.exports = (sequelize, DataTypes) => {
  const Boitmandment = sequelize.define('Boitmandment', {
    numeral: {type: DataTypes.STRING, primaryKey:true},
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  Boitmandment.associate = function(models) {
    Boitmandment.belongsTo(models.Boitmandment, {foreignKey:'parent_clause'});
    Boitmandment.belongsTo(models.User, {foreignKey:'user_uuid'});
  };
  return Boitmandment;
};