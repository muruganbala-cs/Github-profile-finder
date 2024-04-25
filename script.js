// Getting all the html elements
const userInput = document.getElementById("username");
const getDetailsButton = document.getElementById("getDetails");
const profile = document.getElementById("profile");
const repo = document.getElementById("repo");

//getting username from input and using async function to fetch the details from github
getDetailsButton.addEventListener("click", async () => {
  const userName = userInput.value;
  //console.log(userName);
  //using the github api to fetch the profile details from the server
  //since we are going to fetch from api we are changing to async function and will be using await keyword to handle promise
  const res = await fetch(`https://api.github.com/users/${userName}`);
  //since it will be in readable stream we are using .json
  const data = await res.json();
  //console.log(data);
  getProfile(data);
  getRepo(userName);
});

//displaying the profile details after getting the username
function getProfile(data) {
  //console.log(data);
  //displaying the profile details in the card
  profile.innerHTML = `
  <div class="card">
  <div class="card-img">
  <img src=${data.avatar_url} alt=${data.name}>
  </div>
 <div class="card-body">
 <div class="card-title">${data.name}</div>
 <div class="card-subHeading">${data.login}</div>
 <div class="card-text">
  <p>${data.bio} </p>
  <p><i class="fa-solid fa-user-group"></i> ${data.followers} Followers . ${data.following} Following </p>
  <p><i class="fa-solid fa-location-dot"></i> ${data.location} </p>
  <button>
  <a href=${data.html_url} target="_blank">Visit Profile </a>
  </button>
 </div>
 </div>
 </div> 
  `;
}

//getting the username and passing to another api to get repository details

async function getRepo(userName) {
  //console.log(userName);
  const result = await fetch(`https://api.github.com/users/${userName}/repos`);
  //console.log(result);
  const repository = await result.json();
  //console.log(repository);
  for (let i = 0; i < repository.length; i++) {
    repo.innerHTML += `
    <div class="card">
    <div class="card-body">
    <div class="card-title">${repository[i].name}</div>
    <div class="card-subHeading">${repository[i].language}</div>
    <div class="card-text">
    <button>
  <a href=${repository[i].html_url} target="_blank">Visit Repo </a>
  </button>
  </div>
  </div>
  </div>
    `;
  }
}
