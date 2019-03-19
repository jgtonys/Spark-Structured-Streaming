/* jshint indent: 2 */
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    user_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    access_token: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    user_num: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'user'
  });


  // Class Methods
	user.cryptPassword = (plainText) => {
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(10, (err, salt) => {
				if (err) reject(err);
				else {
					bcrypt.hash(plainText, salt, (err, hash) => {
						if (err) reject(err);
						else resolve(hash);
					});
				}
			});
		});
	};

	// Instance Methods
	user.prototype.authenticate = (plainText,db_password) => {
		return new Promise((resolve, reject) => {
			bcrypt.compare(plainText, db_password, (err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	};

	// Hooks(automatically called)
	user.beforeCreate((usr, options) => {
		if (usr.user_password) {
			return user.cryptPassword(usr.user_password)
				.then((hash) => {
					usr.user_password = hash;
				})
				.catch((err) => {
					if (err) throw new Error(err);
				});
		}
  });

  return user;
};
