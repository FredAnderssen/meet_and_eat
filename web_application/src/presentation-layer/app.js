const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

app.engine('hbs', expressHandlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.use(express.static('public_html'))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(request, response) {
    response.render('index.hbs')
})

app.listen(8080, function() {
    console.log("Web app running on test 8080")
})
