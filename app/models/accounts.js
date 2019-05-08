/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
    account_num: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    bank_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    tableName: 'accounts'
  });
};
