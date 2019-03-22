function getAllCards(){
	
	fetch("http://localhost:3000/api/cards", {
		method: "GET",
		headers: {
			"Authorization": "Bearer "+accessToken
		},
	}).then(function(response){
		return response.json()
	}).then(function(cards){
		
		const ul = document.querySelector("#all-cards-page ul")
		ul.innerText = ""

		for(const card of cards){
			
			const li = document.createElement("li")
			li.setAttribute("class", "special-ul-li black-text")
			
			const a = document.createElement("a")
			a.setAttribute("class", "special-p special-a black-text")
			a.innerText = card.cardTitle
			a.setAttribute("href", "/cards/"+card.cardId)
			a.addEventListener("click", handleClickOnAnchor)

			li.appendChild(a)
			ul.appendChild(li)
		}
		
	}).catch(function(error){
		console.log(error)
	})
}