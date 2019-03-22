const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')

module.exports = function({accountRouter, cardsRouter}) {

  const router = express.Router()
  const app = express()


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

  // Attach all routers
  app.use('/accounts', accountRouter)
  app.use('/', cardsRouter)

  return app
}
