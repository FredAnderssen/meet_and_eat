const express = require('express')

module.exports = ({cardsManager}) => {
	const router = express.Router()

	router.get("/test", (request, response) => {
		response.render("test.hbs")
	})

	router.get("/", (request, response) => {
		var isLoggedIn = request.session.isLoggedIn
		request.session.token = Math.random()

		var message = cardsManager.getAllCards((errors, cards) => {
			if(errors.length > 0) {
				response.render("error.hbs")
			} else {
				const model = {
					cards: cards,
					isLoggedIn: isLoggedIn
				}
				response.render("index.hbs", model)
			}
		})
	})

	router.get("/open-card/:id", (request, response) => {

		cardsManager.getSpecificCardById(request.params.id, (errors, card) => {
			var id = request.params.id

			if(errors.length > 0) {
				response.render("error.hbs")
			}
			else {
				console.log("got past the errors in getspecificcardbyid")
				var message = cardsManager.getCommentsById(id, (errors, comments) => {
					var commentArray = []
					if(errors.length > 0){
						console.log(errors)
						response.render("error.hbs", errors)
					} else {
						for(i = 0; i < comments.length; ++i){
							commentArray.push(comments[i].comment)
						}
						const model = {
							id: id,
							card: card,
							comments: comments
						}
						response.render("open-card.hbs", model)
					}
				})
			}
		})
	})


	router.get('/create-card', (request, response) => {
		response.render('create-card.hbs')
	})

	router.post('/create-card', (request, response) => {
		var messages = []
		const card = {
			title: request.body.cardTitle,
			desc: request.body.cardDesc,
			author: request.session.username,
			accountIdFK: request.session.userId
		}

		cardsManager.createNewCard(card, (errors, callback) => {
			if(errors.length > 0) {
				console.log(errors)
				response.render("error.hbs", errors)
			}else {
				messages.push(callback)
				response.render("success.hbs", {model: messages})
			}

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
