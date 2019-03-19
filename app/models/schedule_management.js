/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedule_management', {
    schedule_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    scheduled_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ceo_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'ceo',
        key: 'ceo_code'
      }
    },
    staff_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'staff',
        key: 'staff_code'
      }
    }
  }, {
    tableName: 'schedule_management'
  });
};
