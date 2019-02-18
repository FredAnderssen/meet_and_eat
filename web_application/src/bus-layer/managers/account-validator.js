const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10
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
		errors.push("emailNotContainingAt")
	}
	
	if(!account.hasOwnProperty("password1") && !account.hasOwnProperty("password2")){
		errors.push("passwordMissing")
	}else if(account.password1.length <= MIN_PASSWORD_LENGTH){
		errors.push("passwordTooShort")
	}else if(account.password1 != account.password2){
		errors.push("passwordsDoesntMatch")
	}

	return errors	
}