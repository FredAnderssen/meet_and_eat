const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 20
const MIN_PASSWORD_LENGTH = 3

exports.getErrorsNewAccount = function(account){

	const errors = []
	
	// Validate username.
	if(!account.hasOwnProperty("username")){
		errors.push("usernameMissing")
	}else if(account.username.length < MIN_USERNAME_LENGTH){
		errors.push("usernameTooShort")
	}else if(MAX_USERNAME_LENGTH < account.username.length){
		errors.push("usernameTooLong")
	}

	if(!account.hasOwnProperty("email")){
		errors.push("emailMissing")
	}else if(!account.email.includes("@")){
		errors.push("emailDoesntContainAt")
	}
	
	if(!account.hasOwnProperty("password1")){
		errors.push("password1Missing")
	}else if(!account.hasOwnProperty("password2")){
		errors.push("password2Missing")
	}else if(account.password1 != account.password2){
		errors.push("passwordsDoesntMatch")
	}

	return errors	
}