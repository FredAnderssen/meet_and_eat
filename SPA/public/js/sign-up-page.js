document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.querySelector("#sign-up-page form")

  console.log("IM INN ADDEVENTLISTENER")
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("sign-up-username").value
    const password = document.getElementById("sign-up-password").value
    const email = document.getElementById("sign-up-email").value

    console.log("IM INN SIGNUPFORM")

    fetch("http://localhost:3000/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, password: password, email: email})
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })

  })

})
