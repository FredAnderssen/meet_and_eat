const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 20
const MIN_PASSWORD_LENGTH = 3

const accountRepository = require('../../data-layer/repositories/account-repository') //TODO take away
const bcrypt = require('bcrypt'); //TODO take away


/*
exports.getErrorsNewAccount = function(account){

const errors = []

// Validate username.
if(!account.hasOwnProperty("username")){
errors.push("No username entered")
}else if(account.username.length < MIN_USERNAME_LENGTH){
errors.push("Username must contain more than 3 characters")
}else if(MAX_USERNAME_LENGTH < account.username.length){
errors.push("Username must contain fewer than 20 characters")
}

if(!account.hasOwnProperty("email")){
errors.push("No email entered")
}else if(!account.email.includes("@")){
errors.push("Email is incorrect")
}

if(account.password1.length == 0 && account.password2.length == 0){
errors.push("No password entered")
} else if(account.password1 != account.password2){
errors.push("The two passwords doesn't match")
} else if(account.password1.length < MIN_PASSWORD_LENGTH){
errors.push("The password is too short, minimum length is 3 characters")
}

return errors
} */

exports.getErrorsNewAccount = function(account, callback){
	const errors = []
	// Validate username.
	if(!account.hasOwnProperty("username")){
		errors.push("No username entered")
	}else if(account.username.length < MIN_USERNAME_LENGTH){
		errors.push("Username must contain more than 3 characters")
	}else if(MAX_USERNAME_LENGTH < account.username.length){
		errors.push("Username must contain fewer than 20 characters")
	}

	if(!account.hasOwnProperty("email")){
		errors.push("No email entered")
	}else if(!account.email.includes("@")){
		errors.push("Email is incorrect")
	}

	if(account.password1.length == 0 && account.password2.length == 0){
		errors.push("No password entered")
	} else if(account.password1 != account.password2){
		errors.push("The two passwords doesn't match")
	} else if(account.password1.length < MIN_PASSWORD_LENGTH){
		errors.push("The password is too short, minimum length is 3 characters")
	}

	callback(errors)
}

exports.checkPwWithDb = (username, plainPw, callback) => {
	const errors = []
	// Load hash from your password DB.
	accountRepository.getHashOnAccount(username, function(error, hashedPw){ //TODO move to account-repository
		errors.push(error)
		let hashString = hashedPw[0].password
		console.log("hash string please: ", hashString)

		bcrypt.compare(plainPw, hashString, function(err, res) {  //TODO call a func in bcrypt instead
			// res == true
			console.log("result from bcrypt compare here: ",res)
			console.log("Err from bcrypt compare here: ",err)
			if(res) {
				//do something
				callback([])
				console.log("plainPw and hash is same! GJ")
			} else {
				//do something_else
				callback(errors)
				console.log("logs error array here in bcryptcompare: ",errors)
				console.log("Wrong with plainPw comparison hashedPw")
			}
		})
	})
}
