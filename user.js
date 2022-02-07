// // DOM - Elements
// const userName = document.getElementById("user-name")
// const userStatus = document.getElementById("status")
// const possibleVotes = document.getElementById("possible-votes")
// const userInfo = document.getElementById("user-info")
// const changeButton = document.getElementById("change-btn")
// const changePlaceholder = document.getElementById("change-placeholder")
// const selectStausOld = document.getElementById("select-status")
// const selectStatus = changePlaceholder.removeChild(selectStausOld)
// const songList = document.getElementById("song-list")
// const voteBtn = document.getElementById("vote-btn")

// const logoutBtn = document.getElementById("logout")

// // functions

// const changeSite = (url) => {
//   window.location = url
// }

// const showUser = (current_user) => {
//   console.log(current_user)
// }

// const getUser = () => {
//   fetch(IP + "users/current", {
//     headers: {
//       Authorization: "Bearer " + window.localStorage.getItem("token"),
//     },
//   })
//     .then((Response) => {
//       return Response.json()
//     })
//     .then((current_user) => {
//       if (!(current_user.detail === undefined)) {
//         changeSite("./index.html")
//       } else {
//         possibleVotes.textContent = 45 - current_user.vote_qty
//         setUser(current_user)
//       }
//     })
//     .catch((error) => {
//       console.log(error)
//       changeSite("./index.html")
//     })
// }

// const getSongs = ({ checkboxIsOn }) => {
//   const votes = getUserVotes()
//   fetch(IP + "songs", {
//     headers: {
//       Authorization: "Bearer " + window.localStorage.getItem("token"),
//     },
//   })
//     .then((song_list) => {
//       return song_list.json()
//     })
//     .then((song_list) => {
//       song_list.forEach((song) => {
//         let song_element = createSongElement({
//           song_id: song.song_id,
//           title: song.title,
//           interpreter: song.interpreter,
//           votes: votes,
//           checkboxIsOn: checkboxIsOn,
//         })
//         songList.appendChild(song_element)
//       })
//     })
//     .catch((error) => {
//       console.error(error)
//       window.location = "./index.html"
//     })
// }

// const getUserVotes = () => {
//   let userVotes = []
//   fetch(IP + "users/votes", {
//     headers: {
//       Authorization: "Bearer " + window.localStorage.getItem("token"),
//     },
//   })
//     .then((votes) => votes.json())
//     .then((votes) => {
//       votes.forEach((vote) => userVotes.push(vote))
//     })
//   return userVotes
// }

// const setUser = (user) => {
//   userName.textContent = "Hallo, " + user.name + "!"

//   const superuserBtnExists = document.getElementById("superuserBtn")

//   if (((user.name === "Andreas") | (user.name === "Domroon")) & !superuserBtnExists) {
//     const superuserBtn = document.createElement("button")
//     superuserBtn.classList.add("superuserBtn")
//     superuserBtn.id = "superuserBtn"
//     superuserBtn.textContent = "SUPERUSER"
//     document.getElementById("navbar").appendChild(superuserBtn)

//     superuserBtn.addEventListener("click", () => {
//       window.location = "./superuser.html"
//     })
//   }

//   if (user.accept_invitation === null) {
//     userStatus.textContent = "Antwort ausstehend"
//   } else if (user.accept_invitation === true) {
//     userStatus.textContent = "Du kommst zur Party"
//   } else if (user.accept_invitation === false) {
//     userStatus.textContent = "Du kommst nicht zur Party"
//   }

//   possibleVotes.textContent = 45 - user.vote_qty
// }

// const sendStatus = () => {

//   // .then((res) => console.log(res[0].body))

//   getUser()
// }

// const changeStatus = () => {
//   if (changePlaceholder.children.length > 0) {
//     sendStatus()
//     selectStatus.remove()
//     changeButton.textContent = "Ändern"
//   } else {
//     changePlaceholder.appendChild(selectStatus)
//     changeButton.textContent = "Senden"
//   }
// }

// const removeAllSongs = () => {
//   const songs = document.getElementsByClassName("song")
//   for (let i = songs.length; i > 0; i--) {
//     songs.item(i - 1).remove()
//   }
// }

// const sendVotes = () => {
//   console.log("SEND")
// }

// const editVotes = () => {
//   let response = { status: null }
//   let songIDList = []
//   if (voteBtn.textContent === "Wählen") {
//     removeAllSongs()
//     getSongs({ checkboxIsOn: true })
//     voteBtn.textContent = "Senden"
//   } else {
//     songIDList = createSongIDList()
//     songIDList.forEach((song_id) => {
//       postRequest(IP + "vote/", song_id)
//     })
//     removeAllSongs()
//     setTimeout(() => {
//       getSongs({ checkboxIsOn: false })
//     }, 1000)

//     voteBtn.textContent = "Wählen"
//   }
// }

// const createSongIDList = () => {
//   // let song = document.getElementById(2)
//   // let checkbox = song.querySelector("input")
//   // console.log(checkbox.checked)
//   let songs = document.getElementsByClassName("song")
//   let songList = []
//   let song = undefined
//   let id = 0
//   for (let i = songs.length; i > 0; i--) {
//     song = songs.item(i - 1)
//     song = song.querySelector("input")
//     // console.log(i, song.checked)
//     if (song.checked) {
//       songList.push(i)
//     }
//   }
//   return songList
// }

// // Event Listener
// changeButton.addEventListener("click", (e) => {
//   e.preventDefault()
//   changeStatus()
// })

// voteBtn.addEventListener("click", (e) => {
//   e.preventDefault()
//   editVotes()
//   setTimeout(() => {
//     getUser()
//   }, 2000)
// })

// logoutBtn.addEventListener("click", (e) => {
//   e.preventDefault()
//   localStorage.clear()
//   window.location = "./index.html"
// })

// // Main
// const main = () => {
//   editVotes()
//   getUser()
//   getSongs({ checkboxIsOn: false })
// }

// main()

const IP = "https://299a217.online-server.cloud/"
const SELECTABLE_SONGS = 45

async function getData(url) {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }
  const data = await fetch(url, options).then((data) => {
    if (!(data.status === 200)) {
      throw new Error(data.status)
    } else {
      return data
    }
  })
  const response = await data.json()
  return response
}

async function addSuperuserBtn() {
  const currentUser = await getData(IP + "users/current")
  if ((currentUser.login_name == "Piano") | (currentUser.login_name == "Andreas")) {
    const superuserBtn = document.createElement("button")
    superuserBtn.classList.add("superuserBtn")
    superuserBtn.id = "superuserBtn"
    superuserBtn.textContent = "SUPERUSER"
    document.getElementById("navbar").appendChild(superuserBtn)
    superuserBtn.addEventListener("click", () => {
      window.location = "./superuser.html"
    })
  }
}

async function addUserDatas() {
  const currentUser = await getData(IP + "users/current")
  const userHeader = document.getElementById("user-name")
  const userStatus = document.getElementById("status")
  const possibleVotes = document.getElementById("possible-votes")
  userHeader.textContent = "Hallo " + currentUser.login_name + "!"

  const status = currentUser.accept_invitation
  if (status === true) {
    userStatus.textContent = "Du kommst"
  } else if (status == false) {
    userStatus.textContent = "Du kommst nicht"
  } else {
    userStatus.textContent = "Antwort ausstehend"
  }

  possibleVotes.textContent = SELECTABLE_SONGS - currentUser.vote_qty
}

const createSongElement = ({ song, votes }) => {
  let songElement = document.createElement("div")
  let p = document.createElement("p")
  if (songElement.song_id % 2 === 0) {
    songElement.classList.add("even")
  } else {
    songElement.classList.add("odd")
  }
  songElement.classList.add("song")
  songElement.classList.add("grid")
  songElement.id = songElement.song_id

  checkboxWrapper = document.createElement("div")
  checkboxWrapper.classList.add("checkbox")
  let checkbox = document.createElement("input")
  checkbox.setAttribute("type", "checkbox")
  checkboxWrapper.appendChild(checkbox)
  songElement.appendChild(checkboxWrapper)

  let songId = document.createElement("div")
  songId.classList.add("song-id")
  p.textContent = song.song_id
  songId.appendChild(p)
  songElement.appendChild(songId)

  let songTitle = document.createElement("div")
  songTitle.classList.add("title")
  p = document.createElement("p")
  p.textContent = song.title
  songTitle.appendChild(p)
  songElement.appendChild(songTitle)

  let songInter = document.createElement("div")
  songInter.classList.add("interpreter")
  p = document.createElement("p")
  p.textContent = song.interpreter
  songInter.appendChild(p)
  songElement.appendChild(songInter)

  let classList = []
  let isVoted = (domClass) => domClass === "voted"

  votes.forEach((vote) => {
    if (song.song_id === vote["song_id"]) {
      songElement.classList.add("voted")
    }
    // if (!checkboxIsOn) {
    //   checkboxWrapper.classList.add("unvisible")
    // }
    songElement.classList.forEach((domClass) => classList.push(domClass))
    if (classList.some(isVoted)) {
      checkboxWrapper.classList.add("unvisible")
    }
  })

  return songElement
}

async function addSongs() {
  const songs = await getData(IP + "songs")
  const votes = await getData(IP + "users/votes")
  const songElements = []
  const songListDOM = document.getElementById("song-list")

  songs.forEach((song) => {
    songElements.push(createSongElement({ song, votes }))
  })

  songListDOM.innerHTML = ""
  songElements.forEach((element) => {
    songListDOM.appendChild(element)
  })
}

async function changeStatus() {
  const select = document.getElementById("select-status")
  const value = select.options[select.selectedIndex].value

  let params = undefined

  if (value === "yes") {
    params = { answer: true }
  } else if (value === "no") {
    params = { answer: false }
  }

  const url = new URL(IP + "user/status")

  if (!(params == undefined)) {
    for (let k in params) {
      url.searchParams.append(k, params[k])
    }
  }

  const options = {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }

  fetch(url, options)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error)
      window.location = "./index"
    })
}

function createSelectElement() {
  const element = document.createElement("select")
  element.name = "select-status"
  element.id = "select-status"

  const optionYes = document.createElement("option")
  optionYes.value = "yes"
  optionYes.textContent = "Ja"

  const optionNo = document.createElement("option")
  optionNo.value = "no"
  optionNo.textContent = "Nein"

  element.appendChild(optionYes)
  element.appendChild(optionNo)

  return element
}

const addVoteMessage = (message) => {
  const voteMessage = document.getElementById("vote-message")
  if (message === "The user can only select the same song once") {
    let onlyOnce = "Sie können den gleichen Song nur einmal wählen"
    voteMessage.textContent = onlyOnce
  } else if (message === "The user has reached the maximum number of votes") {
    let reachedMax = "Sie haben die maximale Anzahl an Stimmen erreicht."
    voteMessage.textContent = reachedMax
  } else if (message === undefined) {
    let success = "Stimmen erfolgreich übermittelt"
    voteMessage.textContent = success
  }
}

const createSongIDList = () => {
  let songs = document.getElementsByClassName("song")
  let songList = []
  let song = undefined
  let id = 0
  for (let i = songs.length; i > 0; i--) {
    song = songs.item(i - 1)
    song = song.querySelector("input")
    // console.log(i, song.checked)
    if (song.checked) {
      songList.push(i)
    }
  }
  return songList
}

const postSongVote = (urlString, pathParam) => {
  let response = {}
  urlString = urlString + pathParam
  const url = new URL(urlString)
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }

  fetch(url, options)
    .then((res) => {
      response.status = res.status
      response.statusText = res.statusText
      return res.json()
    })
    .then((res) => {
      response.detail = res.detail
      addVoteMessage(res.detail)
    })
    .then(() => console.log(response))
    .catch((error) => {
      console.error(error)
      window.location = "./index"
    })
}

async function updateUI() {
  await addSongs()
  await addUserDatas()
}

function main() {
  const logoutBtn = document.getElementById("logout")
  logoutBtn.addEventListener("click", () => {
    window.localStorage.clear()
    window.location = "./index.html"
  })

  const changeBtn = document.getElementById("change-btn")
  changeBtn.addEventListener("click", () => {
    const changePlaceholder = document.getElementById("change-placeholder")
    if (changeBtn.textContent === "Ändern") {
      changeBtn.textContent = "Senden"
      const selectElement = createSelectElement()
      changePlaceholder.appendChild(selectElement)
    } else if (changeBtn.textContent === "Senden") {
      changeBtn.textContent = "Ändern"
      changeStatus()
      changePlaceholder.innerHTML = ""
      updateUI()
    }
  })

  addSuperuserBtn()
  addUserDatas()
  addSongs()

  const voteBtn = document.getElementById("vote-btn")
  voteBtn.addEventListener("click", () => {
    const songIDs = createSongIDList()
    songIDs.forEach((songID) => {
      postSongVote(IP + "vote/", songID)
    })
    updateUI()
  })
}

main()
