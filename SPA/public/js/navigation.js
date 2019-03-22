function handleClickOnAnchor(event){
	event.preventDefault()
	const uri = event.currentTarget.getAttribute("href")
	changePage(uri)
	history.pushState({uri: uri}, "", uri)
}

document.addEventListener("DOMContentLoaded", function(){

	const anchors = document.querySelectorAll("a")

	for(const anchor of anchors){
		anchor.addEventListener("click", handleClickOnAnchor)
	}

})

history.replaceState({uri: "/"}, "", "/")

window.addEventListener('popstate', function(event){
	const state = event.state
	changePage(state.uri)
})

function changePage(uri){

	// Hide current page.
	document.querySelector(".current-page").classList.remove("current-page")

	// Display new page.
	let id

	if(uri == "/"){
		id = "home-page"
	}else if(uri == "/contact"){
		id = "contact-page"
	}else if(uri == "/about"){
		id = "about-page"
	}else if(uri == "/sign-up"){
		id = "sign-up-page"
	}else if(uri == "/sign-in"){
		id = "sign-in-page"
	}else if(uri == "/all-cards"){
		id = "all-cards-page"
		getAllCards()
	}else if(uri == "/create-card"){
		id = "create-card-page"
	}else if (uri.startsWith("/cards/")){
		const cardId = parseInt(uri.split("/")[2])
		id = "show-card-page"
		getSpecificCard(cardId)
	}else if(uri.startsWith("/edit-card/")){
		const cardId = parseInt(uri.split("/")[2])
		id = "edit-card-page"
		updateEditCardPage(cardId)
	}else if(uri.startsWith("/delete-card/")){
		const cardId = parseInt(uri.split("/")[2])
		id = "delete-card-page"
		updateDeleteCardPage(cardId)
	}

	document.getElementById(id).classList.add("current-page")

}
