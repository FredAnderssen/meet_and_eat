const cardsRepository = require('../../data-layer/repositories/cards-repository')

exports.getAllCards = callback => {
  cardsRepository.getAllCards(callback)
}

exports.createNewCard = (cardObj, callback) => {
  cardsRepository.createCard(cardObj, callback)
}

exports.getCardID = callback => {
  cardsRepository.getID(callback)
}

exports.getSpecificCardById = (id, callback) => {
  cardsRepository.getCardById(id, callback)
}

exports.getCommentsById = (id, callback) => {
  cardsRepository.getCommentsById(id, callback)
}

exports.addComment = (comment, id, callback) => {
  cardsRepository.createComment(comment, id, callback)
}