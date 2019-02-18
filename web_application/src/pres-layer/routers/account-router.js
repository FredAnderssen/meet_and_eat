const express = require('express')
const accountManager = require('../../bus-layer/managers/account-manager')
const router = express.Router()

router.get("/sign-up", function(request, response){
	response.render("accounts-sign-up.hbs")
})

router.get("/sign-in", function(request, response){
	response.render("accounts-sign-in.hbs")
})

router.get("/", function(request, response){
	accountManager.getAllAccounts(function(errors, accounts){
		console.log(errors, accounts)
		const model = {
			errors: errors,
			accounts: accounts
		}
		response.render("accounts-list-all.hbs", model)
	})
})

router.get('/:username', function(request, response){
	
	const username = request.params.username
	
	accountManager.getAccountByUsername(username, function(errors, account){
		const model = {
			errors: errors,
			account: account
		}
		response.render("accounts-show-one.hbs", model)
	})
	
})

router.post('/sign-up', function(request, response) {
	var username = request.body.username
	var email = request.body.email
	var password1 = request.body.password1
	var password2 = request.body.password2
	var accountCredentials = [
		username,
		email,
		password1,
		password2
	]

	accountManager.createAccount(accountCredentials, function(error, callback) {
		callback(true)
	})
})


module.exports = router