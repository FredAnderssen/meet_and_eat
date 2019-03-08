//till peter:
//1. fråga om jag applicerat mobile appen rätt, enligt hans instruktioner, ja //ha en main fil med de två apparna, och awilix i.
//2. hur vet systemet om clienten ska använda /mobie eller /desktop ? de som är på pc ska ju inte lyckas komma in i /mobileApp
//3. updatedcard vad händer?
//4. OAuth2.0 med jwt tokens, fattar nada?
//5. ska vi göra det snyggt med responsen i json?
module.exports = function({accountManager, cardsManager}) {
  const app = require('express')();
  const bodyParser = require('body-parser')
  const jwt = require('jsonwebtoken')//kan tydligen inte hitta paketet
  const jwtSecret = "adjfghafjgdhjk"

  app.use(bodyParser.json())
  app.use((request, response, next) => {
    try {
      const authHeader = request.get("Authorization")
      const accessTokenString = authHeader.substr("Bearer ".length)
      request.payload = jwt.verify(accessTokenString, jwtSecret)

    } catch(e) {
      //..access token missing or invalid
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
            const accessToken = jwt.sign({accountId: account.id}, jwtSecret)
            const idToken = jwt.sign({
              sub: account.id,
              preferred_username: account.username}, "anotha secret LOLOL")

            console.log("TOKENS HERE: ",accessToken, idToken)
            response.status(200).json({access_token: accessToken, id_token: idToken})
          }
        })
      }
    })
  })

  app.get('/', function(request, response){
    response.status(200).json("Mobile Route")
  });

  app.get("/cards", (request, response) => { //TODO auth
    cardsManager.getAllCards((errors, cards, comments) => {
      const model = {
        cards: cards,
        comments: comments,
        errors: errors
      }
      response.status(200).json(model)
    })
  })

  app.post('/create-card', (request, response) => { //TODO auth
    const card = {
      title: request.body.cardTitle,
      desc: request.body.cardDesc,
      date: request.body.cardDate, //TODO autmatic date
      author: request.body.cardAuthor //TODO automatic username from account
    }
    const newCard = request.body
    console.log("request.body:",newCard)

    cardsManager.createNewCard(card, (errors, results) => {
      //TODO check request.payload
      if(0 < errors.length){
        response.status(400).json(errors)
        return
      }

      response.setHeader("Location", "/cards/"+results)
      response.status(200).end()
    })
  })

  app.put('/update-card/:id', (request, response) => { //TODO förstår inte updatedCard
    const id = parseInt(request.params.id)
    const updatedCard = request.body
    const card = {
      title: request.body.cardTitle,
      desc: request.body.cardDesc,
      date: request.body.cardDate, //TODO autmatic date
      author: request.body.cardAuthor //TODO automatic username from account
    }

    cardsManager.checkIfCardExists(id, (errorArr) => { //kolla i felmeddelandet
      if(errorArr.length < 1) {
        cardsManager.updateCard(id, card, (errors) => {
          if(errors.length < 1) {
            response.status(204).end()
            console.log("succeded updating card")
          } else {
            console.log("updateCard error")
            response.status(400).end() //skicka med felmeddelande
          }
        })
      } else {
        console.log("kortet existerar inte")
        response.status(404).end()
      }
    })
  })

  app.delete('/delete-card/:id', (request, response) => { //TODO use more correct error messages
    const id = parseInt(request.params.id)

    cardsManager.checkIfCardExists(id, (errorArr) => {
      if(errorArr.length < 1) {
        cardsManager.deleteCard(id, (errArr) => {
          if(errArr.length < 1)
          response.status(200).end()
          else
          response.status(400).json(errArr)
        })
      } else {
        response.status(400).json(errorArr)
      }
    })
  })

  return app
}
