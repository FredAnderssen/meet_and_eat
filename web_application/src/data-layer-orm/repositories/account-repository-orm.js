const db = require('./db-orm')

module.exports = function({}) {

	return {

		getAllAccounts: (callback) => {

			db.accounts.findAll()
			.then(results => callback([], results))
			.catch(error => callback(['Database Error' + error], null))
		},

		getAccountByUsername: (username, callback) => {
			
			db.accounts.findAll({ where: {username: username} })
			.then(results => callback([], results[0]))
			.catch(error => callback(['No such user exist' + error], null))

		},

		checkIfUserExists: (username, callback) => {

			db.accounts.count({ where: { username:username } })
				.then(result => {
					if(result == 0) {
						callback(["User doesn't exist"])
					} else {
						callback([]);
					}
				});
		},

		createAccount: (account, callback) => {

			db.accounts.create({
				username: account.username,
				email: account.email,
				password: account.password1
			})
			.then(result => callback([], result.insertId))
			.catch(error => callback(['Database Error ' + error], null))
		},

		getHashOnAccount: (username, callback) => {

			db.accounts.findAll( {attributes: ["password"], where: { username: username }})
			.then(password => callback([], password))
			.catch(error => callback(["Database error: " + error], null))

		},
	}
}
