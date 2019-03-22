
module.exports = function({accountManager, cardsManager}) {
  const app = require('express')();
  const bodyParser = require('body-parser')
  const jwt = require('jsonwebtoken')
  const jwtSecret = "adjfghafjgdhjk"

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*') //TODO fråga plg varför Safari inte stöder detta?
    response.setHeader('Access-Control-Allow-Methods', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    next()
  })

  app.use((request, response, next) => {
    //let authHeader = request.get("Authorization")
    //let accessTokenString = authHeader.substr("Bearer ".length)
    //console.log("authheader:", authHeader)
    try {
      const authHeader = request.get("Authorization")
      const accessTokenString = authHeader.substr("Bearer ".length) //TODO funkar inte med google chrome heller nu
      request.payload = jwt.verify(accessTokenString, jwtSecret)


    } catch(e) {
      console.log("IN THE CATCH; token missing or invalid ", e)
    }
    next()
  })

  app.post('/tokens', (request, response) => {
    const grant_type = request.body.grant_type
    const username = request.body.username
    const password = request.body.password

    if(grant_type != "password"){
      response.status(400).json({error: "unsupported_grant_type"})
      return
    }

    accountManager.getAccountByUsername(username, (errors, account) => {
      if(errors.length > 0) {
        response.status(500).end()
      } else {
        accountManager.checkPwWithDb(username, password, (errors) => {
          if(errors.length > 0) {
            response.status(400).json({
              error: "invalid_client"
            })
          } else {
            const accessToken = jwt.sign({accountId: account.accountId, username: username}, jwtSecret)
            const idToken = jwt.sign({
              sub: account.accountId,
              preferred_username: account.username}, "anotha secret LOLOL")

              response.status(200).json({access_token: accessToken, id_token: idToken})
            }
          })
        }
      })
    })

    app.get('/', function(request, response){
      response.status(200).json("API Route")
    });

    app.get("/cards", (request, response) => {

      if(!request.payload){
        response.status(401).end()
        return
      }

      cardsManager.getAllCards((errors, cards) => {
        if(errors.length > 1) {
          response.status(400).json(errors)
        } else {
          response.status(200).json(cards)
        }
      })
    })

    app.post('/card', (request, response) => {
      const card = {
        title: request.body.cardTitle,
        desc: request.body.cardDesc,
        username: request.payload.username
      }
      console.log("Card object: " + card.username)
      console.log("Username: " + request.payload.username)
      if(!request.payload){
        console.log("I AM IN !req payload in POST CARD")
        response.status(401).end()
        return
      }

      cardsManager.createNewCard(card, (errors, resultsInsertId) => {
        if(0 < errors.length){
          response.status(400).json(errors)
          return
        } else {
          response.setHeader("Location", "/cards/"+resultsInsertId)
          response.status(200).end()
        }
      })
    })

    app.get('/cards/:id', (request, response) => {

      const id = parseInt(request.params.id)

      if(!request.payload){
        response.status(401).end()
        return
      }

      cardsManager.getSpecificCardById(id, (errors, card) => {

        if(errors.length > 0) {
          response.status(400).json(errors)
        }
        else {
          response.status(200).json(card)
        }
      })
    })


    app.put('/card/:id', (request, response) => {
      const id = parseInt(request.params.id)
      const accountId = request.payload.accountId
      const accountUsername = request.payload.username
      const card = {
        title: request.body.cardTitle,
        desc: request.body.cardDesc,
        author: accountUsername
      }

      if(!request.payload){
        response.status(401).end()
        return
      }

      cardsManager.checkIfCardExists(id, (errorArr) => {
        if(errorArr.length < 1) {
          cardsManager.updateCard(id, card, accountId, (errors, results) => {
            if(errors.length < 1) {
              if(results.affectedRows == 1) {
                response.status(204).end()
              } else {
                response.status(404).json({error: "Not your card or it doesn't exist"}).end()
              }
            } else {
              response.status(400).json({errorMessages: errors}).end()
            }
          })
        } else {
          response.status(404).json({errorMsg: errorArr}).end()
        }
      })
    })

    app.delete('/card/:id',  function(request, response) { //funkar inte riktigt?
      const id = parseInt(request.params.id)

      if(!request.payload) {
        console.log("i am in !request payload in delete")
        response.status(401).end()
        return
      }

      const accountId = request.payload.accountId

      cardsManager.checkIfCardExists(id, function(errorArr) {
        if(errorArr.length < 1) {
          cardsManager.deleteCard(id, accountId, function(errArr, recvAccId) {
            if(errArr.length < 1) {
              console.log("results",recvAccId)
              if(recvAccId.affectedRows == 1) {
                response.status(204).end()
              } else {
                response.status(401).end()
              }
            } else
            response.status(400).json({errors: errArr})
          })
        } else {
          response.status(400).json({errors: errorArr})
        }
      })
    })

    app.post('/sign-up', function(request, response) {
      var messages = []
      var accountCredentials = {
        username: request.body.username,
        email: request.body.email,
        password1: request.body.password,
        password2: request.body.password
      }

      accountManager.createAccount(accountCredentials, (errors, accId) => {
        if(0 < errors.length) {
          response.status(400).json({model: errors})
        } else {
          messages.push(accId)
          response.status(200).json({model: messages})
        }
      })
    })

    return app
  }
