
const awilix = require('awilix')
const accountRouterFun = require('./routers/account-router.js')
const container = awilix.createContainer()
container.register('accountRouter', awilix.asFunction(accountRouterFun))
const accountRouter = container.resolve('accountRouter')

//listen app here
//calla denna fil nånstans

const awilix = require('awilix')

// Import the ones we want to use (real or mockup), real in this case.
const accountRepository = require('../data-layer/repositories/account-repository')
const accountManager = require('../bus-layer/managers/account-manager')
const accountRouter = require('./routers/account-router')
//.. Fler dependencies


// Create a container and add the dependencies we want to use.
const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))
// Retrieve the router, which resolves all other dependencies.
const theAccountRouter = container.resolve("accountRouter")
