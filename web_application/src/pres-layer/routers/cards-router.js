const express = require('express')
const cardsManager = require('../../bus-layer/managers/cards-manager')
const router = express.Router()

router.get("/", (request, response) => {
	var message = cardsManager.getAllCards((errors, cards) => {
		console.log(message)

		const model = {
			cards: cards,
			errors: errors
		}
		response.render("index.hbs", model)
	})
})

router.get('/create-card', (request, response) => {
		response.render('create-card.hbs')
})

router.post('/create-card', (request, response) => {
	const card = {
		title: request.body.cardTitle,
		desc: request.body.cardDesc,
		date: request.body.cardDate, //TODO autmatic date
		author: request.body.cardAuthor //TODO automatic username from account
	}

	cardsManager.createNewCard(card, (errors, callback) => {
		console.log('I am in createCard Router func')
	})

	response.redirect('/')

})

module.exports = router
