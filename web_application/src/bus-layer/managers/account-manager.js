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
								if(err.length <= 0) {
									callback(errors, res)
								}
								else {
									errors.push('Internal server error')
									callback(errors, null)
								}
							})
						} else {
							errors.push('Internal server error')
							callback(errors, null)
						}
					})
				}
			})
		},

		getAccountByUsername: function(username, userobject){
			accountRepository.getAccountByUsername(username, userobject)
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

			accountRepository.getHashOnAccount(username, function(error, hashedPw) {
				errors.push(error)
				if(error.length < 1) {
					let hashString = hashedPw[0].password
					crypt.comparePwWithHash(plainPw, hashString, function(err, res) {
						errors.push(err)
						if(res) {
							callback([])
						} else {
							callback(errors)
						}
					})
				} else {
					callback(errors)
				}
			})
		}

	}
}
