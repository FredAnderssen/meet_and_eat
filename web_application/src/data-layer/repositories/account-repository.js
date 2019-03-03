const db = require('./db')

/*
Retrieves all accounts ordered by username.
Possible errors: databaseError
Success value: The fetched accounts in an array.
*/
exports.getAllAccounts = function(callback){

	const query = `SELECT * FROM accounts ORDER BY username`
	const values = []

	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts)
		}
	})
}

/*
Retrieves the account with the given username.
Possible errors: databaseError
Success value: The fetched account, or null if no account has that username.
*/
exports.getAccountByUsername = function(username, callback){
	const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
	const values = [username]

	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts[0])
		}
	})

}

/*
Creates a new account.
account: {username: "The username", password: "The password"}
Possible errors: databaseError, usernameTaken
Success value: The id of the new account.
*/

exports.createAccount = function(account, callback){

	const query = `INSERT INTO accounts (email, username, password) VALUES (?, ?, ?)`
	const values = [account.email, account.username, account.password1]

	db.query(query, values, function(error, results){
		if(error){
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], results.insertId)
		}
	})
}

exports.getHashOnAccount = (username, callback) => {
	const query = 'SELECT password FROM accounts WHERE username = ?'
	const values = [username]

	db.query(query, values, (error, hash) => {
		if(error) {
			console.log("in if error",hash)
			callback(['databaseError'], null)
		}	else {
			console.log("in if it went good", hash)
			callback([], hash)
		}
	})
}
