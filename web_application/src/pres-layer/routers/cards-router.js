const express = require('express')
const cardsManager = require('../../bus-layer/managers/cards-manager')
const router = express.Router()

router.get("/test", (request, response) => {
	cardsManager.getAllCards((errors, cards) => {
		console.log(errors, cards)

		response.render("index.hbs")
	})
})

//test purposes
router.get('/', (request, response) => {
	response.render('index.hbs')
})

//test purpose
router.get("/LOL", function(request, response){
	accountManager.getAllAccounts(function(errors, accounts){
		console.log(errors, accounts)
		const model = {
			errors: errors,
			accounts: accounts
		}
		response.render("accounts-list-all.hbs", model)
	})
})

module.exports = router
