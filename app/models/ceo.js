/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ceo', {
    ceo_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    business_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    business_address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ceo_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      },
      unique: true
    },
    hourlyWage: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'ceo'
  });
};
