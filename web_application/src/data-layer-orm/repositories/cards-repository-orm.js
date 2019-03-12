const db = require('./db-orm')

module.exports = function({}) {
  return {

    getAllCards: function(callback) {

      db.cards.findAll({})
        .then(cards => callback([], cards))
        .catch(error => callback(["Database error " + error], null))

    },
  
    getCommentsById: (id, callback) => {

      db.comments.findAll({ where: {cardIdFK: id} })
      .then(comments => callback([], comments))
      .catch(error => callback(['Database error: ' + error], null))

    },
  
    getCardById: (id, callback) => {
      db.cards.findAll({ 
        where: {cardId: id},
      })
      .then(card => callback([], card[0]))
      .catch(error => callback(["Database error: " + error], null))
    },

    createCard: (card, callback) => {

      db.cards.create({
        cardTitle: card.title,
        cardDesc: card.desc,
        accountIdFK: card.accountIdFK
      })
      .then(result => callback([], result.insertId))
      .catch(error => callback(["Database error: " + error], null))
    },

    createComment: (comment, callback) => {

      db.comments.create({
        comment: comment.comment,
        cardIdFK: comment.id
      })
      .then(result => callback([], result.insertId))
      .catch(error => callback(["Database error: " + error], null))
    }
  }
}