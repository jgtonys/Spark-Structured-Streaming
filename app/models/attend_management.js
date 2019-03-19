/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attend_management', {
    attend_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    work_start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    work_stop_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    day_work_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    staff_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_code'
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
    tableName: 'attend_management'
  });
};
