let cachedCardId = null

function updateEditCardPage(cardId){
	
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
            document.getElementById("edit-card-title").value = card.cardTitle
		    document.getElementById("edit-card-description").value = card.cardDesc
        } else {
        }
		
	}).catch(function(error){
	})
	
}

document.addEventListener("DOMContentLoaded", function(){
	
	const editCardForm = document.querySelector("#edit-card-page form")
	
	editCardForm.addEventListener("submit", function(event){
		event.preventDefault();
		
		const title = document.getElementById("edit-card-title").value
		const description = document.getElementById("edit-card-description").value
		
		fetch("http://localhost:3000/api/card/"+cachedCardId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+accessToken
			},
			body: JSON.stringify({id: cachedCardId, cardTitle: title, cardDesc: description, accountId: userInfo.sub})
		}).then(function(response){
			changePage("/all-cards")
		}).catch(function(error){
			console.log(error)
		})	
	})	
})