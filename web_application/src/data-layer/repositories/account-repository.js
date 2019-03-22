const db = require('./db')

module.exports = function({}) {
	return {
		getAllAccounts: function(callback) {
			const query = `SELECT * FROM accounts ORDER BY username`
			const values = []

			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError', error], null)
				}else{
					callback([], accounts)
				}
			})
		},

		getAccountByUsername: function(username, callback){
			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [username]
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError', error], null)
				}else{
					callback([], accounts[0])
				}
			})
		},

		checkIfUserExists: (username, callback) => {
			const query = 'SELECT EXISTS(SELECT * FROM accounts WHERE username = ?) AS resKey'
			const values = [username]
			db.query(query, values, function(error, res){
				let resBool = res[0].resKey

				if(error){
					callback(['databaseError', error])
				}else{
					if(resBool) {
						callback([])
					}	else {
						callback(['database Error, User does not exists'])
					}
				}
			})
		},

		createAccount: function(account, callback){
			const query = `INSERT INTO accounts (email, username, password) VALUES (?, ?, ?)`
			const values = [account.email, account.username, account.password1]

			db.query(query, values, function(error, results){
				if(error){
					callback(['databaseError', error.message], null)
				}else{
					callback([], results.insertId)
				}
			})
		},

		getHashOnAccount: (username, callback) => {
			const query = 'SELECT password FROM accounts WHERE username = ?'
			const values = [username]

			db.query(query, values, (error, hash) => {
				if(error) {
					callback(['databaseError'], null)
				}	else {
					callback([], hash)
				}
			})
		}
	}
}
