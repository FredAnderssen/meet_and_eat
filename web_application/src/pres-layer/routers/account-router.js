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
	var accountCredentials = {
		username: request.body.username,
		email: request.body.email,
		password1: request.body.password1,
		password2: request.body.password2
	}

	accountManager.createAccount(accountCredentials, function(error, insertionID) {

		if(0 < error.length) {
			errors.push(error)
			response.render("error.hbs", {model: errors[0]})

		} else {
			var approvalModel = {
				id: insertionID
			}
			response.render("index.hbs", approvalModel)
		}	
	})	
})

module.exports = router