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

exports.getCardById = (id, callback) => {
  const query = "SELECT * FROM cards WHERE cardId = ? LIMIT 1"
  const values = [id]

  db.query(query, values, function(error, card) {
    console.log("q, v, e, c ", query, values, error, card[0])
    
    if(error) {
      callback(['error in database'], null)
    } else {
      callback([], card[0])
    }
  })
}

exports.getID = (callback) => {
  const query = 'SELECT cardId FROM cards WHERE '

}

exports.createCard = (card, callback) => {
  console.log('I am directly in repository')
  const query = 'INSERT INTO cards (cardTitle, cardDesc, cardDate, idAccountFK) \
  VALUES (?, ?, ?, (SELECT accountId FROM accounts WHERE username = ?))'

  const values = [card.title, card.desc, card.date, card.author]

  db.query(query, values, (error, results) => {
    if(error)
    callback(['databaseError'], null)
    else
    callback([], results.insertId)
  })
  console.log('I am in the end repository')
}

/*
INSERT INTO cards (cardTitle, cardDesc, cardDate, idAccountFK) \
VALUES ('Kevins kort', 'Description', 'Datum', (SELECT accountId FROM accounts WHERE username = 'Kevin'));
*/
