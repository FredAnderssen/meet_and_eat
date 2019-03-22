const express = require('express')

module.exports = function({accountManager}) {
  const router = express.Router()

  router.get("/sign-up", function(request, response){
    response.render("accounts-sign-up.hbs")
  })

  router.get("/sign-in", function(request, response){
    response.render("accounts-sign-in.hbs")
  })

  router.post('/sign-in', function(request, response) {
    const username = request.body.username
    const password = request.body.password1

		accountManager.checkIfUserExists(username, function(errors) {
			if(0 < errors.length) {
				response.render("error.hbs", {
					model: errors
				})

			} else {
				accountManager.checkPwWithDb(username, password, function(errors) {
					if(0 < errors.length) {
						response.render("error.hbs", {
							model: errors
						})
					}	else {

            accountManager.getAccountByUsername(username, function(errors, userobject) {
              if(errors.length > 0) {
                response.render("error.hbs", errors)
              } else {
                request.session.isLoggedIn = true
                request.session.username = username
                request.session.userId = userobject.accountId
                response.render("success.hbs")
              }
            })
					}
				})
			}
		})
	})

  router.get("/", function(request, response){
    accountManager.getAllAccounts(function(errors, accounts){
      if(errors.length > 0) {
        response.render("error.hbs", errors)
      }
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
      password1: request.body.password1,
      password2: request.body.password2
    }

    accountManager.createAccount(accountCredentials, function(error, insertionID) {
      if(0 < error.length) {
        response.render("error.hbs", {model: error})
      } else {
        messages.push(insertionID)
        response.render("success.hbs", {model: messages})
      }
    })
  })

  router.post('/logut', function(req, res) {
    const session = req.session.isLoggedIn = false
    res.redirect("/")
  })

  return router
}
