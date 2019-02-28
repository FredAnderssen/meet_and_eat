const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : 'database',
	user     : 'root',
	password : 'FredricJoakim',
	database : 'meetandeat_db'
})

module.exports = connection
