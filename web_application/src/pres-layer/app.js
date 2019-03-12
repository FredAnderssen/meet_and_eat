const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')


function createServer() {

  const app = express()

  //create DI container--?
  const awilix = require('awilix')
  const accountRouter = require('./routers/account-router')
  //orm
  const accountRepository = require('../data-layer-orm/repositories/account-repository-orm')
  const accountManager = require('../bus-layer/managers/account-manager')
  const accountValidator = require('../bus-layer/managers/account-validator')
  const crypt = require('../bus-layer/utilities/crypt')

  const cardsRouter = require('./routers/cards-router')
  const cardsRepository = require('../data-layer-orm/repositories/cards-repository-orm')
  const cardsManager = require('../bus-layer/managers/cards-manager')

  const container = awilix.createContainer()

  container.register('accountRouter', awilix.asFunction(accountRouter))
  container.register("accountRepository", awilix.asFunction(accountRepository))
  container.register("accountManager", awilix.asFunction(accountManager))
  container.register("accountValidator", awilix.asFunction(accountValidator))

  container.register("crypt", awilix.asFunction(crypt))

  container.register('cardsRouter', awilix.asFunction(cardsRouter))
  container.register('cardsRepository', awilix.asFunction(cardsRepository))
  container.register('cardsManager', awilix.asFunction(cardsManager))


  const theAccountRouter = container.resolve('accountRouter')
  const theCardsRouter = container.resolve('cardsRouter')
  
  //----------------------

  app.set('views', path.join(__dirname, 'views'))
  app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
  }))

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(express.static('public_html'))

  //** Redis **//
  var session = require('express-session');
  var RedisStore = require('connect-redis')(session);
  const options = {
  	host: 'redis',
  	port: 6379
  }
  app.use(session({
      store: new RedisStore(options),
      secret: 'keyboard cat',
      resave: false
  }));
  //****************************//

  app.use(cookieParser())

  // Attach all routers.
  app.use('/accounts', theAccountRouter)
  app.use('/', theCardsRouter)

  //setupRouters.setupRoutes(router)
  return app
}


//ta bort denna
createServer().listen(8080, () => console.log('Good to go on 3000!'))
