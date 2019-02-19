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
	var errors = []
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

	accountManager.createAccount(accountCredentials, function(error, insertionID) {

		const model = {
			statusMessage: ""
		}

		if(0 < error.length) {
			errors.push(error)
			response.render("error.hbs", errors)
		} else {
			model.statusMessage = insertionID
		}
		console.log(model.statusMessage)
		console.log(errors)
		response.render("accounts-sign-up.hbs", model)
	
	})	
})

module.exports = router