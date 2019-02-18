const cardsRepository = require('../../data-layer/repositories/cards-repository')

exports.getAllCards = function(callback) {
  cardsRepository.getAllCards(callback)
}
