module.exports = function({accountRepository, accountValidator, crypt}) {
	return {
		getAllAccounts: function(callback){
			accountRepository.getAllAccounts(callback)
		},

		createAccount: function(account, callback){
			accountValidator.getErrorsNewAccount(account, function(errors) {
				if(0 < errors.length){
					callback(errors, null)
				} else {
					crypt.hashPassword(account.password1, function(error, hashedPw){
						if(!error) {
							account.password1 = hashedPw
							accountRepository.createAccount(account, function(err, res) {
								if(err.length <= 0)
								callback(errors, res)
								else {
									console.log(err)
									errors.push('Database error making account') //TODO skriv om felmeddelande
									callback(errors, null)
								}
							})
						} else {
							errors.push('Hash error') //TODO skriv detta till 'Internal server error sen'
							callback(errors, null)
						}
					})
				}
			})
		},

		getAccountByUsername: function(username, callback){
			accountRepository.getAccountByUsername(username, callback)
		},

		checkIfUserExists: (username, callback) => {
			accountRepository.checkIfUserExists(username, callback)
		},

		getHashFromDbAccount: (username, callback) => {
			accountRepository.getHashOnAccount(username, function(error, hashedPw) {
				callback(error, hashedPw)
			})
		},

		checkPwWithDb: (username, plainPw, callback) => {
			const errors = []
			// Load hash from your password DB.
			accountRepository.getHashOnAccount(username, function(error, hashedPw) {
				errors.push(error)
				if(error.length < 1) {
					let hashString = hashedPw[0].password
					crypt.comparePwWithHash(plainPw, hashString, function(err, res) {
						errors.push(err)
						if(res) {
							callback([])
							console.log("plainPw and hash is same! GJ")
						} else {
							callback(errors)
							console.log("logs error array here in bcryptcompare: ",errors)
							console.log("Wrong with plainPw comparison hashedPw")
						}
					})
				} else {
					console.log("error occurred from getHashFromDbAccount: ",error)
					callback(errors)
				}
			})
		}

	}
}
