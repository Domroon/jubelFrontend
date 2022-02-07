const IP = "https://299a217.online-server.cloud/"

setUsers()
setVotes()
addBackEvent()

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

async function setVotes() {
  const voteList = document.getElementById("vote-list")
  const votes = await getData(IP + "votes").catch((error) => {
    console.error(error, "Cant fetch Votes")
    window.location = "./index.html"
  })
  if (votes) {
    votes.forEach((vote) => {
      let voteDOM = document.createElement("div")
      voteDOM.classList.add("vote")
      voteDOM.classList.add("standard")
      voteDOM.id = "song-id-" + vote.song_id
      setVote({ vote, voteDOM })
      voteList.appendChild(voteDOM)
    })
  }
}

function setVote({ vote, voteDOM }) {
  //console.log(vote.count, vote.title, vote.interpreter)
  const countDOM = document.createElement("div")
  countDOM.classList.add("count")
  countDOM.textContent = vote.count
  voteDOM.appendChild(countDOM)

  const titleDOM = document.createElement("div")
  titleDOM.classList.add("title")
  titleDOM.textContent = vote.title
  voteDOM.appendChild(titleDOM)

  const interpreterDOM = document.createElement("div")
  interpreterDOM.classList.add("interpreter")
  interpreterDOM.textContent = vote.interpreter
  voteDOM.appendChild(interpreterDOM)
}

async function setUsers() {
  const userList = document.getElementById("user-list")
  const users = await getData(IP + "users").catch((error) => {
    console.error(error, "Cant fetch User")
    window.location = "./index.html"
  })
  if (users) {
    users.forEach((user) => {
      let userDOM = document.createElement("div")
      userDOM.classList.add("user")
      userDOM.classList.add("standard")
      userDOM.id = "user-id-" + user.user_id
      setUser({ user, userDOM })
      userList.appendChild(userDOM)
    })
  }
}

function setUser({ user, userDOM }) {
  //   console.log(user.name, user.accept_invitation, user.vote_qty)
  const nameDOM = document.createElement("div")
  nameDOM.classList.add("name")
  nameDOM.textContent = user.login_name
  userDOM.appendChild(nameDOM)

  const statusDOM = document.createElement("div")
  statusDOM.classList.add("status")
  if (user.accept_invitation === true) {
    statusDOM.textContent = "KOMMT"
    userDOM.classList.add("accept")
  } else if (user.accept_invitation === false) {
    statusDOM.textContent = "KOMMT NICHT"
    userDOM.classList.add("not-accept")
  } else if (user.accept_invitation === null) {
    statusDOM.textContent = "ANTWORT AUSSTEHEND"
  }
  userDOM.appendChild(statusDOM)

  const votesDOM = document.createElement("div")
  votesDOM.classList.add("votes")
  votesDOM.textContent = user.vote_qty
  userDOM.appendChild(votesDOM)
}

function addBackEvent() {
  document.getElementById("back").addEventListener("click", () => {
    window.location = "./user.html"
  })
}
