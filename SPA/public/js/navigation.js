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
	}else if(uri == "/your-movies"){
		id = "your-movies-page"
		updateYourMovies()
	}else if(uri == "/create-movie"){
		id = "create-movie-page"
	}else if (uri.startsWith("/movies/")){
		const movieId = parseInt(uri.split("/")[2])
		id = "show-movie-page"
		updateShowMoviePage(movieId)
	}else if(uri.startsWith("/edit-movie/")){
		const movieId = parseInt(uri.split("/")[2])
		id = "edit-movie-page"
		updateEditMoviePage(movieId)
	}

	document.getElementById(id).classList.add("current-page")

}
