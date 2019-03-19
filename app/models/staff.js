/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    staff_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    staff_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    reg_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ret_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    salary_day: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    ceo_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'ceo',
        key: 'ceo_code'
      }
    }
  }, {
    tableName: 'staff'
  });
};
