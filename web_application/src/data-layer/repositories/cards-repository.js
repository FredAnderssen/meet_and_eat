const db = require('./db')

module.exports = function({}) {
  return {

    getAllCards: (callback) => {
      const query = 'SELECT * FROM cards'
      const values = []

      db.query(query, values, (error, cards) => {
        if(error){
          callback(['databaseError'], null)
        } else {
          callback([], cards)
        }
      })
    },

    getCommentsById: (id, callback) => {

      const query = "SELECT * FROM comments WHERE cardIdFK = ? ORDER BY commentId DESC"
      const values = [id]

      db.query(query, values, function(error, comments) {
        var commentArray = []

        if(error) {
          callback(['error in database'], error)

        }else {
          for(i = 0; i < comments.length; ++i) {
            commentArray.push(comments[i])
          }
          callback([], commentArray)
        }
      })
    },

    getCardById: (id, callback) => {
      const query = "SELECT * FROM cards WHERE cardId = ? LIMIT 1"
      const values = [id]

      db.query(query, values, function(error, card) {
        if(error) {
          callback(['error in database'], null)
        } else {
          callback([], card[0])
        }
      })
    },

    createCard: (card, callback) => {
      const query = 'INSERT INTO cards (cardTitle, cardDesc, accountIdFK, cardAuthor) \
      VALUES (?, ?, (SELECT accountId FROM accounts WHERE username = ?), \
      (SELECT username FROM accounts WHERE accountId = ?))'

      const values = [card.title, card.desc, card.username, card.accountIdFK]

      db.query(query, values, (error, results) => {
        if(error) {
          callback(['databaseError', error], null)
        } else {
          callback([], results.insertId)
        }
      })
    },


    createComment: (comment, callback) => {
      const query = "INSERT INTO comments (comment, cardIdFK) \
      VALUES (?, ?)"

      const values = [comment.comment, comment.id]

      db.query(query, values, (error, results) => {
        if(error){
          callback(['databaseError'], null)
        } else {
          callback([], results.insertId)
        }
      })
    },

    deleteCard: function(cardId, accId, callback) {
      const query = 'DELETE FROM cards WHERE cardId = ? AND accountIdFK = ?'
      const values = [cardId, accId]

      db.query(query, values, function(err, idAccountFK) {
        if(err) {
          callback(['databaseError', err], idAccountFK)
        } else {
          callback([], idAccountFK)
        }
      })
    },

    deleteAllComments: function(cardId, callback) {
      const query = 'DELETE FROM comments WHERE cardIdFK = ?'
      const values = [cardId]

      db.query(query, values, function(err) {
        if(err) {
          callback(['Database error', err])
        } else {
          callback([])
        }
      })
    },

    checkIfCardExists: (cardId, callback) => {
			const query = 'SELECT EXISTS(SELECT * FROM cards WHERE cardId = ?) AS resObj'
			const values = [cardId]
			db.query(query, values, function(error, res){
				let resBool = res[0].resObj

				if(error){
					callback(['databaseError', error])
				}else{
					if(resBool) {
						callback([])
					}	else {
						callback(['database Error, Card does not exists'])
					}
				}
			})
		},

    updateCard: (cardId, cardObj, accountId, callback) => {
      const query = 'UPDATE cards SET cardTitle = ?, cardDesc = ?, accountIdFK = (SELECT accountId FROM accounts WHERE username = ?) WHERE cardId = ? AND accountIdFK = ?'
      const values = [cardObj.title, cardObj.desc, cardObj.author, cardId, accountId]

      db.query(query, values, (error, results) => {
        if(error)
          callback(['database error updating card', error], results)
        else
          callback([], results)
      })
    }
  }
}
