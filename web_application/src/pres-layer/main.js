const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
var mysql = require('mysql');

const mainApp = express()

const awilix = require('awilix')
const accountRouter = require('./routers/account-router')
const accountRepository = require('../data-layer/repositories/account-repository')
const accountManager = require('../bus-layer/managers/account-manager')
const accountValidator = require('../bus-layer/managers/account-validator')
const crypt = require('../bus-layer/utilities/crypt')

const cardsRouter = require('./routers/cards-router')
const cardsRepository = require('../data-layer/repositories/cards-repository')
const cardsManager = require('../bus-layer/managers/cards-manager')

var apiApp = require('../api-pres-layer/api'); //TODO DI=?
var app = require('./app')

const container = awilix.createContainer()

container.register('accountRouter', awilix.asFunction(accountRouter))
container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountValidator", awilix.asFunction(accountValidator))

container.register("crypt", awilix.asFunction(crypt))

container.register('cardsRouter', awilix.asFunction(cardsRouter))
container.register('cardsRepository', awilix.asFunction(cardsRepository))
container.register('cardsManager', awilix.asFunction(cardsManager))

container.register('apiApp', awilix.asFunction(apiApp)) //TODO DI?
container.register('app', awilix.asFunction(app))

const theApiApp = container.resolve('apiApp')
const theApp = container.resolve('app')

mainApp.use('/api', theApiApp)
mainApp.use('/', theApp)

mainApp.listen(8080, () => console.log('Good to go on 3000!'))
