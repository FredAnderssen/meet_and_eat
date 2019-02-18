const db = require('./db')

exports.getAllCards = (callback) => {
  const query = 'SELECT * FROM cards'
  const values = []

  db.query(query, values, (error, cards) => {
    if(error)
      callback(['databaseError'], null)
    else
      callback([], cards)
  })
}
