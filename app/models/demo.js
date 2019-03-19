const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: { field: 'id', type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true },
    password: { field: 'password', type: DataTypes.STRING, allowNull: false },
    name: { field: 'name', type: DataTypes.STRING, allowNull: false },
    permission: { field: 'permission', type: DataTypes.INTEGER, allowNull: false },
  }, {
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'user'
  });

  // Class Methods
	User.cryptPassword = (plainText) => {
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
	User.prototype.authenticate = (plainText,db_password) => {
		return new Promise((resolve, reject) => {
			console.log("plainText",plainText);
			console.log("password",db_password);
			bcrypt.compare(plainText, db_password, (err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	};

	// Hooks(automatically called)
	User.beforeCreate((user, options) => {
		if (user.password) {
			if (user.password.length >= 6) {
				return User.cryptPassword(user.password)
					.then((hash) => {
						user.password = hash;
					})
					.catch((err) => {
						if (err) throw new Error(err);
					});
			} else {
				throw new Error('Too short password length minimum 6.');
			}
		}
  });

  return User;
};
