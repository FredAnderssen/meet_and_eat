const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 20
const MIN_PASSWORD_LENGTH = 3

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
	
	if(!account.hasOwnProperty("password1")){
		errors.push("No password entered")
	}else if(!account.hasOwnProperty("password2")){
		errors.push("No password entered")
	}else if(account.password1 != account.password2){
		errors.push("The two passwords doesn't match")
	}

	return errors	
}