function updateShowCardsPage(){

	fetch("http://localhost:8080/api/cards", {
		method: "GET",
		headers: {
			"Authorization": "Bearer "+accessToken
		},
	}).then(function(response){
		return response.json()
	}).then(function(cards){
		
		document.querySelector("#home-page h1").innerText = cards.title
		document.querySelector("#home-page p").innerText = "Runtime: "+movie.runtime
		document.getElementById("edit-link").setAttribute("href", "/edit-movie/"+movie.id)
		
	}).catch(function(error){
		console.log(error)
	})
	
}

document.addEventListener("DOMContentLoaded", function(){
	
	const a = document.getElementById("edit-link")
	a.addEventListener("click", handleClickOnAnchor)
	
})