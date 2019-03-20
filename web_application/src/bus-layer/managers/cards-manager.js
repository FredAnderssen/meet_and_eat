module.exports = ({cardsRepository}) => {
  return {

    getAllCards: (cards) => {
      cardsRepository.getAllCards(cards)
    },

    createNewCard: (cardObj, callback) => {
      cardsRepository.createCard(cardObj, callback)
    },

    getCardID: callback => {
      cardsRepository.getID(callback)
    },

    getSpecificCardById: (id, callback) => {
      cardsRepository.getCardById(id, callback)
    },

    getCommentsById: (id, callback) => {
      cardsRepository.getCommentsById(id, callback)
    },

    addComment: (comment, id, callback) => {
      cardsRepository.createComment(comment, id, callback)
    },

    deleteCard: (cardId, accountId, callback) => {
      cardsRepository.deleteCard(cardId, accountId, callback)
    },

    checkIfCardExists: (cardId, callback) => {
      cardsRepository.checkIfCardExists(cardId, callback)
    },

    updateCard: (cardId, cardObj, accountId, callback) => {
      cardsRepository.updateCard(cardId, cardObj, accountId, callback)
    },

    getAuthorOnCard: (cardId, callback) => {
      cardsRepository.getAuthor(cardId, callback)
    }
  }
}
