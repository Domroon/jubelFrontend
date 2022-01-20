// DOM - Elements

const loginForm = document.getElementById("login-form")
const loginMessages = document.getElementById("login-messages")
const generalError = "Login fehlgeschlagen"
const fetchError = "Es konnte nicht mit dem Server verbunden werden"
const loginWait = "Sie werden eingeloggt"
const wrongInput = "Falsches Password oder Name"
const welcome = "Bitte einloggen"
const IP = "https://299a217.online-server.cloud/"

// Functions

const changeLoginMessage = (text) => {
  loginMessages.textContent = ""
  var textNode = document.createTextNode(text)
  loginMessages.append(textNode)
}

const getToken = (e) => {
  e.preventDefault()
  changeLoginMessage(loginWait)
  const formData = new FormData(loginForm)
  var response = {}

  fetch(IP + "token", {
    method: "post",
    body: formData,
  })
    .then(function (res) {
      response.status = res.status
      response.statusText = res.statusText
      return res.json()
    })
    .then((data) => {
      if (!(response.status === 200)) {
        response.detail = data.detail
        changeLoginMessage(wrongInput)
      } else {
        response.access_token = data.access_token
        window.localStorage.setItem("token", response.access_token)
        changeSite("./user.html")
        changeLoginMessage("")
      }
    })
    .catch((error) => {
      console.error("fetch-error: ", error.message)
      window.localStorage.setItem("login-error", error)
      changeLoginMessage(fetchError)
    })
  console.log(response)
}

const changeSite = (url) => {
  window.location = url
}

// Event Listener

loginForm.addEventListener("submit", getToken)

// Main

changeLoginMessage(welcome)
