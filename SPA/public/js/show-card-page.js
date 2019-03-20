function getSpecificCard(cardId){
	
	fetch("http://localhost:3000/api/cards/"+cardId, {
		method: "GET",
		headers: {
			"Authorization": "Bearer "+accessToken
		},
	}).then(function(response){
		return response.json()
	}).then(function(card){
		
		document.querySelector("#show-card-page h1").innerText = card.cardTitle
		document.querySelector("#show-card-page p").innerText = "Description: "+card.cardDesc
		document.getElementById("edit-link").setAttribute("href", "/edit-card/"+card.cardId)
		
	}).catch(function(error){
		console.log(error)
	})
}