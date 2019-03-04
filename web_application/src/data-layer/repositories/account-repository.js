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

exports.checkIfUserExists = (username, callback) => {
	const query = 'SELECT EXISTS(SELECT * FROM accounts WHERE username = ?) AS resKey'
	const values = [username]
	db.query(query, values, function(error, res){
		let resBool = res[0].resKey

		if(error){
			callback(['databaseError'])
		}else{
			if(resBool) {
				//returns 1 username exists
				callback([])
			}	else {
				//returns 0 does not exist
				callback(['database Error, User does not exists'])
			}
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
		console.log("error in createAccount:",error)
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
			callback(['databaseError'], null)
		}	else {
			callback([], hash)
		}
	})
}
