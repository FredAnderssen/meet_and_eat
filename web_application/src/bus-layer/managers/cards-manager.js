const cardsRepository = require('../../data-layer/repositories/cards-repository')

exports.getAllCards = callback => {
  cardsRepository.getAllCards(callback)
}
