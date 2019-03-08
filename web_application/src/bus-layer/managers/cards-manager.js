module.exports = ({cardsRepository}) => {
  return {

    getAllCards: (callback) => {
      cardsRepository.getAllCards(callback)
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

    deleteCard: (cardId, callback) => {
      cardsRepository.deleteCard(cardId, callback)
    },

    checkIfCardExists: (cardId, callback) => {
      cardsRepository.checkIfCardExists(cardId, callback)
    },

    updateCard: (cardId, cardObj, callback) => {
      cardsRepository.updateCard(cardId, cardObj, callback)
    }
  }
}
