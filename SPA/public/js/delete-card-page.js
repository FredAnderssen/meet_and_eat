function updateDeleteCardPage(cardId){
	
	cachedCardId = cardId
	
	fetch("http://localhost:3000/api/cards/"+cardId, {
		method: "GET",
		headers: {
			"Authorization": "Bearer "+accessToken
		},
	}).then(function(response){
		return response.json()
	}).then(function(card){
        
        if(card.cardTitle) {
            document.querySelector("#delete-card-page p").innerText = card.cardTitle
        } else {
        }
		
	}).catch(function(error){
	})
	
}

document.addEventListener("DOMContentLoaded", function(){
	
    const editCardForm = document.querySelector("#delete-card-page form")
	
	editCardForm.addEventListener("submit", function(event){
		event.preventDefault();
		
		fetch("http://localhost:3000/api/card/"+cachedCardId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+accessToken
			},
			body: JSON.stringify({id: cachedCardId})
		}).then(function(response){
			changePage("/all-cards")
		}).catch(function(error){
			console.log(error)
		})	
	})	
})