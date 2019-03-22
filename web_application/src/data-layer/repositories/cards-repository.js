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
      const query = 'INSERT INTO cards (cardTitle, cardDesc, accountIdFK) \
      VALUES (?, ?, (SELECT accountId FROM accounts WHERE username = ?))'

      const values = [card.title, card.desc, card.username]

      db.query(query, values, (error, results) => {
        if(error) {
          callback(['databaseError'], null)
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
          callback(['databaseError deleting card', err], idAccountFK)
        } else {
          callback([], idAccountFK)
        }
      })
    },

    checkIfCardExists: (cardId, callback) => {
			const query = 'SELECT EXISTS(SELECT * FROM cards WHERE cardId = ?) AS resObj'
			const values = [cardId]
			db.query(query, values, function(error, res){
				let resBool = res[0].resObj

				if(error){
					callback(['databaseError'])
				}else{
					if(resBool) {
						//returns 1 card exists
            console.log("card exist in db!")
						callback([])
					}	else {
						//returns 0 does not exist
						callback(['database Error, Card does not exists'])
					}
				}
			})
		},

    updateCard: (cardId, cardObj, accountId, callback) => {
      console.log("cardobj.author ::", cardObj.author)
      console.log(cardId, cardObj, accountId)

      const query = 'UPDATE cards SET cardTitle = ?, cardDesc = ?, accountIdFK = (SELECT accountId FROM accounts WHERE username = ?) WHERE cardId = ? AND accountIdFK = ?'
      const values = [cardObj.title, cardObj.desc, cardObj.author, cardId, accountId]

      db.query(query, values, (error, results) => {
        console.log("results in datalayer:", results)
        if(error)
          callback(['database error updating card', error], results)
        else
          callback([], results)
      })
    }
  }
}
