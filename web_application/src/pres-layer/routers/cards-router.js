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

module.exports = router
