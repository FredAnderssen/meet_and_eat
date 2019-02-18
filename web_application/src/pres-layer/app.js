const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const accountRouter = require('./routers/account-router')

const app = express()

app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', expressHandlebars({
  defaultLayout: 'main',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

// Attach all routers.
app.use('/accounts', accountRouter)

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public_html'))

app.get('/', function(request, response) {
  response.render('index.hbs')
})


app.listen(8080, function() {
    console.log("Listening to 3000")
})


