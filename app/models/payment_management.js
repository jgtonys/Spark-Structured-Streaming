/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_management', {
    payment_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    money: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ceo_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'ceo',
        key: 'ceo_code'
      }
    },
    staff_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_code'
      }
    }
  }, {
    tableName: 'payment_management'
  });
};
