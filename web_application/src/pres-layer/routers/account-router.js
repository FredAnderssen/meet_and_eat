const express = require('express')
const accountManager = require('../../bus-layer/managers/account-manager')
const router = express.Router()

router.get("/sign-up", function(request, response){
	response.render("accounts-sign-up.hbs")
})

router.get("/sign-in", function(request, response){
	response.render("accounts-sign-in.hbs")	//TODO temporarily View
})

router.post('/sign-in', function(request, response) {
	const username = request.body.username
	const password = request.body.password1

	accountManager.checkIfUserExists(username, function(errors) {
		console.log("HITTA MIG", errors)
		if(0 < errors.length) {
			console.log("Username does not exist in db") //TODO
			response.render("error.hbs", {
				model: errors
			})
		} else {
			accountManager.comparePwInDb(username, password, function(errors) {
				if(0 < errors.length) {
					console.log("checkPwWithDb Failed")
					response.render("error.hbs", {
						model: errors
					})
				}	else {
					request.session.isLoggedIn = true
					response.render("success.hbs")
				}
			})
		}
	})
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

	var messages = []
	var accountCredentials = {
		username: request.body.username,
		email: request.body.email,
		password1: request.body.password1, //TODO hash password
		password2: request.body.password2
	}

	accountManager.createAccount(accountCredentials, function(error, insertionID) {
		if(0 < error.length) {
			response.render("error.hbs", {model: error})
		} else {
			messages.push(insertionID)
			request.session.isLoggedIn = true
			response.render("success.hbs", {model: messages})
		}
	})
})

module.exports = router
