const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const accountRouter = require('./routers/account-router')
const cardsRouter = require('./routers/cards-router')

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

// Attach all routers.
app.use('/accounts', accountRouter)
app.use('/', cardsRouter)

app.listen(8080, function() {
    console.log("Listening to 3000")
})
