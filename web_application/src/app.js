const express = require('express')

const app = express()

app.get('/', function(request, response) {
    response.send("Hello, updated name")
})

app.listen(8080, function() {
    console.log("Web app running on port 8080")
})
