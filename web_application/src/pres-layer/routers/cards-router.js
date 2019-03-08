const express = require('express')

module.exports = ({cardsManager}) => {
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

		cardsManager.getSpecificCardById(request.params.id, (errors, card) => {
			var id = request.params.id

			if(errors.length > 0) {
				response.render("error.hbs")
			}
			else {

				var message = cardsManager.getCommentsById(id, (errors, comments) => {
					console.log(comments)
					const model = {
						id: id,
						card: card,
						comments: comments
					}
					response.render("open-card.hbs", model)
				})
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

		cardsManager.createNewCard(card, (errors, results) => {
			response.redirect('/')
		})
	})

	router.post('/create-comment/:id', (request, response) => {

		const comment = {
			comment: request.body.commentText,
			id: request.params.id
		}
		cardsManager.addComment(comment, (errors, callback) => {

		})

		response.redirect("../open-card/" + [comment.id])
	})



	return router
}
