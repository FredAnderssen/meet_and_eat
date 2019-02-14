const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const dummyData = require('../data-access-layer/dummyData')

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

app.get('/', function(request, response) {
  const model = {
    restaurants: dummyData.restaurants
  }

    response.render('index.hbs', model)
})

app.listen(8080, function() {
    console.log("Web app runing ontjojoojoj hahahha test 3000")
})
