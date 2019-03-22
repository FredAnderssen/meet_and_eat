document.addEventListener("DOMContentLoaded", function(){
	
	const createCardForm = document.querySelector("#create-card-page form")
	
	createCardForm.addEventListener("submit", function(event){
		event.preventDefault();
		
		const title = document.getElementById("create-card-title").value
        const description = document.getElementById("create-card-description").value
        console.log("Userinfo.sub: " + userInfo.sub)
		
		fetch("http://localhost:3000/api/card", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+accessToken
			},
            body: JSON.stringify({cardTitle: title, cardDesc: description})
		}).then(function(response){
            changePage("/all-cards")
		}).catch(function(error){
			console.log(error)
		})
		
	})
	
})