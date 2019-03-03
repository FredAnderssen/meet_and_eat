const accountRepository = require('../../data-layer/repositories/account-repository')
const accountValidator = require('./account-validator')
const crypt = require('../utilities/crypt')

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.createAccount = function(account, callback){
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
							errors.push('Database error making account') //TODO skriv om
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
}

exports.getAccountByUsername = function(username, callback){
	accountRepository.getAccountByUsername(username, callback)
}

exports.comparePwInDb = function(username, password, callback){
	accountValidator.checkPwWithDb(username, password, callback)
}
