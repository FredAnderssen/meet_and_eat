var userInfo
var accessToken

document.addEventListener("DOMContentLoaded", function(){

	const signInForm = document.querySelector("#sign-in-page form")

	signInForm.addEventListener("submit", function(event){
		event.preventDefault();

		const username = document.getElementById("sign-in-username").value
		const password = document.getElementById("sign-in-password").value

		fetch("http://localhost:3000/api/tokens", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: "grant_type=password&username="+encodeURI(username)+"&password="+encodeURI(password)
		}).then(function(response){
			return response.json()
		}).then(function(body){

			accessToken = body.access_token
			const idToken = body.id_token

			console.log("KOLA HÄR: ", accessToken)

			userInfo = jwt_decode(idToken)

			document.querySelector("nav").classList.add("user-is-logged-in")
			document.getElementById("username").innerText = userInfo.preferred_username

			changePage("/")

		}).catch(function(error){
			console.log(error)
		})

	})

})
