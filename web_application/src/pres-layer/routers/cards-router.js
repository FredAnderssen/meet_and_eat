const express = require('express')
const cardsManager = require('../../bus-layer/managers/cards-manager')
const router = express.Router()

router.get("/test", (request, response) => {
	response.render("test.hbs")
})

router.get("/", (request, response) => {
	var isLoggedIn = request.session.isLoggedIn
	request.session.token = Math.random()

	// Cookies that have not been signed
	console.log('Cookies: ', request.cookies)
	// Cookies that have been signed
	console.log('Signed Cookies: ', request.signedCookies)

	var message = cardsManager.getAllCards((errors, cards, comments) => {
		console.log(message)

		const model = {
			cards: cards,
			comments: comments,
			errors: errors,
			isLoggedIn: isLoggedIn
		}
		response.render("index.hbs", model)
	})
})

router.get("/open-card/:id", (request, response) => {
	console.log("open card id")
	cardsManager.getSpecificCardById(request.params.id, (errors, card) => {
		console.log("INSIDE cardsManager.getSpecificCardById")
		
		if(errors.length > 0) {
		//handle error
		console.log(errors)
		response.render("error.hbs")
		}
		else {
			const model = {
				id: request.params.id,
				isLoggedIn: request.body.isLoggedIn,
				card: card
			}
			response.render("open-card.hbs", model)
		}
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