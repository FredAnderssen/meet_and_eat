//till peter:
//1. fråga om jag applicerat mobile appen rätt, enligt hans instruktioner, ja //ha en main fil med de två apparna, och awilix i.
//2. hur vet systemet om clienten ska använda /mobie eller /desktop ? de som är på pc ska ju inte lyckas komma in i /mobileApp
//3. updatedcard vad händer?
//4. OAuth2.0 med jwt tokens, fattar nada?
//5. ska vi göra det snyggt med responsen i json? Ja sen i SPA
module.exports = function({accountManager, cardsManager}) {
  const app = require('express')();
  const bodyParser = require('body-parser')
  const jwt = require('jsonwebtoken')
  const jwtSecret = "adjfghafjgdhjk"

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))

  //CORS middleware
  app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*') //TODO fråga plg varför Safari fucked up?
    response.setHeader('Access-Control-Allow-Methods', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    next()
  })
/*
  app.use((request, response, next) => {

    try {
      const authHeader = request.get("Authorization")
      console.log("VAD ÄR DETTA?",authHeader)

      const accessTokenString = authHeader.substr("Bearer ".length) //TODO varför tar peter 7 raden?, funkar inte med det
      console.log("accessTokenString:",accessTokenString)
      request.payload = jwt.verify(accessTokenString, jwtSecret)
      console.log("req.payload:",request.payload)

    } catch(e) {
      //..access token missing or invalid
      console.log("IN THE CATCH; token missing or invalid", e)
    }
    next()
  }) */

  //loggar in här och får tilldelat två tokens
  app.post('/tokens', (request, response) => {
    const grant_type = request.body.grant_type
    const username = request.body.username
    const password = request.body.password

    console.log(request.body)
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
            console.log("acount id here: ", account.accountId)
            console.log("acount´HERE ", account)


            const accessToken = jwt.sign({accountId: account.accountId, username: account.username}, jwtSecret) //skicaks tillbaka sen
            const idToken = jwt.sign({ //bara för att vi ska veta vem klienten är
              sub: account.accountId,
              preferred_username: account.username}, "anotha secret LOLOL")

              console.log("TOKENS HERE: ", accessToken, idToken)

              var decoded = jwt.decode(accessToken);
              console.log(decoded.header);
              console.log(decoded.payload)
              console.log("PAYLOAD:", accessToken.payload)
              console.log("idTOken PAYLOAD:", idToken.payload)

              response.status(200).json({access_token: accessToken, id_token: idToken})
            }
          })
        }
      })
    })

    app.get('/', function(request, response){
      response.status(200).json("API Route")
    });

    app.get("/cards", (request, response) => { //TODO auth

      console.log("PAYLOAD HERE:", request.payload)
      if(!request.payload){
        response.status(401).end()
        return
      }

      cardsManager.getAllCards((errors, cards, comments) => {
        const model = {
          cards: cards,
          comments: comments,
          errors: errors
        }
        response.status(200).json(model)
      })
    })

    //TODO så man inte kan skapa kort åt någon annan, kan inte göra et nu? :D
    app.post('/card', (request, response) => { //TODO auth
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

    app.put('/card/:id', (request, response) => { //klar funkar fintfint
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
            console.log("RESULTS",results)
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

    app.delete('/card/:id',  function(request, response) {
      const id = parseInt(request.params.id)

      if(!request.payload) {
        response.status(401).end()
        return
      }

      const accountId = request.payload.accountId

      cardsManager.checkIfCardExists(id, function(errorArr) { //verkar fungera fintfint, Erika kan inte deleta Simmes kort
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
