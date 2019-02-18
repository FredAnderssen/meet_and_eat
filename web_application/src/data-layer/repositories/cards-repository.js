const db = require('./db')

exports.getAllCards = function(callback) {
  const query = 'SELECT * FROM cards'
  const values = []

  db.query(query, values, function(error, cards) {
    if(error)
      callback(['databaseError'], null)
    else
      callback([], cards)
  })
}
