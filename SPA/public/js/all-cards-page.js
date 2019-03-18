function getAllCards(){
	
	fetch("http://localhost:3000/api/cards", {
		method: "GET",
		headers: {
			"Authorization": "Bearer "+accessToken
		},
	}).then(function(response){
		return response.json()
	}).then(function(cards){
		
		const ul = document.querySelector("#all-cards-page h1")
		ul.innerText = ""
		//console.log("Here are the cards: " + cards[0])
		//console.log("Here are the cards: " + cards[0].card)
		console.log("Here are the cards: " + cards)
		console.log("Here is the title: " + cards.cardTitle)
		for(const card of cards){
			
			const li = document.createElement("li")
			
			const a = document.createElement("a")
			a.innerText = card.title

			/* a.setAttribute("href", "/cards/"+card.id)
			a.addEventListener("click", handleClickOnAnchor) */

			li.appendChild(a)
			
			ul.appendChild(li)
			
		}
		
	}).catch(function(error){
		console.log(error)
	})
}