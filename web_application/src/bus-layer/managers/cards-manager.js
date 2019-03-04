const cardsRepository = require('../../data-layer/repositories/cards-repository')

exports.getAllCards = callback => {
  cardsRepository.getAllCards(callback)
}

exports.createNewCard = (cardObj, callback) => {
  console.log('I am in Manager')
  cardsRepository.createCard(cardObj, callback)
}
