const express = require('express')
const accountManager = require('../../bus-layer/managers/account-manager')
const router = express.Router()

router.get("/sign-up", function(request, response){
	response.render("accounts-sign-up.hbs")
})

router.get("/sign-in", function(request, response){
	response.render("accounts-sign-up.hbs")
})

router.get("/", function(request, response){
	accountManager.getAllAccounts(function(errors, accounts){
		console.log(errors, accounts)
		const model = {
			errors: errors,
			accounts: accounts
		}
		response.render("accounts-sign-up.hbs", model)
	})
})

router.get('/:username', function(request, response){
	
	const username = request.params.username
	
	accountManager.getAccountByUsername(username, function(errors, account){
		const model = {
			errors: errors,
			account: account
		}
		response.render("accounts-sign-up.hbs", model)
	})
	
})

router.post('/sign-up', function(request, response) {
	var username = request.body.username
	var email = request.body.email
	var password1 = request.body.password1
	var password2 = request.body.password2
	var accountCredentials = {
		username: username,
		email: email,
		password1: password1,
		password2: password2
	}

	var statusModel = accountManager.createAccount(accountCredentials, function(errors, callback) {
		
		var statusMessage

		if(0 < errors.length) {
			statusMessage = errors
		} else {
			statusMessage = callback
		}

		const model = {
			statusMessage: statusMessage
		}

		console.log(statusMessage)
		return model
	})

	response.render("accounts-sign-up.hbs", statusModel)
})


module.exports = router