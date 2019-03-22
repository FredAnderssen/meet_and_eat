const Sequelize = require('sequelize')

const sequelize = new Sequelize('meetandeat_db', 'root', 'FredricJoakim', {
	host: 'database',
	dialect: 'mysql',
	operatorsAliases: false,
	define: { freezeTableName: true, updatedAt: false, createdAt: false},

	pool: {
		max: 5,
		min: 0,
		aquire: 30000,
		idle: 10000
	},
}) 

sequelize
	.authenticate()
	.then(() => {
		console.log('connection has been established successfully')
	})
	.catch(err => {
		console.error('Unable to connect to database: ', err)
	})

const accounts = sequelize.define('accounts', {
	accountId: {
		allowNull: false,
		type: Sequelize.INTEGER, 
		autoIncrement: true,
		primaryKey: true
	},
	email: {
		type: Sequelize.TEXT
	},
	username: {
		type: Sequelize.TEXT
	},
	password: {
		type: Sequelize.TEXT
	}
})

const cards = sequelize.define('cards', {
	cardId: {
		allowNull: false,
		type: Sequelize.INTEGER, 
		autoIncrement: true,
		primaryKey: true
	},
	accountIdFK: {
		type: Sequelize.INTEGER, 
		foreignKey: true
	},
	cardTitle: {
		type: Sequelize.TEXT		
	},
	cardDesc: {
		type: Sequelize.TEXT
	}
})

const comments = sequelize.define('comments', {
	commentId: {
		allowNull: false,
		type: Sequelize.INTEGER, 
		autoIncrement: true,
		primaryKey: true
	},
	cardIdFK: {
		type: Sequelize.INTEGER, 
		foreignKey: true
	},
	comment: {
		type: Sequelize.TEXT
	}
})

comments.belongsTo(cards, {foreignKey: 'cardIdFK', targetKey: "cardId"})
cards.belongsTo(accounts, {foreignKey: 'accountIdFK', targetKey: "accountId"})

const model = {sequelize, accounts, cards, comments}

module.exports = model
