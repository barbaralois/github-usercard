/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
function singleUserInfo(username) {
  axios
    .get(`https://api.github.com/users/${username}`)
    .then((response) => {
      let user = {
        image: response.data.avatar_url,
        name: response.data.name,
        username: response.data.login,
        location: response.data.location,
        githubLink: response.data.html_url,
        followers: response.data.followers,
        following: response.data.following,
        bio: response.data.bio,
      };
      createCard(user);
      entryPoint.appendChild(createCard(user));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('request is done');
    });
}

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

const entryPoint = document.querySelector('.cards');

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell',
];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function createCard(githubData) {
  let {
    image,
    name,
    username,
    location,
    githubLink,
    followers,
    following,
    bio,
  } = githubData;

  const card = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const nameElement = document.createElement('h3');
  const usernameElement = document.createElement('p');
  const locationElement = document.createElement('p');
  const profile = document.createElement('p');
  const profileURL = document.createElement('a');
  const followersElement = document.createElement('p');
  const followingElement = document.createElement('p');
  const bioElement = document.createElement('p');

  card.appendChild(userImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(nameElement);
  cardInfo.appendChild(usernameElement);
  cardInfo.appendChild(locationElement);
  cardInfo.appendChild(profile);
  profile.appendChild(profileURL);
  cardInfo.appendChild(followersElement);
  cardInfo.appendChild(followingElement);
  cardInfo.appendChild(bioElement);

  card.classList.add('card');
  userImg.src = image;
  cardInfo.classList.add('card-info');
  nameElement.classList.add('name');
  usernameElement.classList.add('username');
  profileURL.href = username;

  nameElement.textContent = name;
  usernameElement.textContent = username;
  locationElement.textContent = location;
  profileURL.textContent = githubLink;
  followersElement.textContent = followers;
  followingElement.textContent = following;
  bioElement.textContent = bio;

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

function followerUserInfo(usernames) {
  usernames.forEach((person) => {
    axios
      .get(`https://api.github.com/users/${person}`)
      .then((response) => {
        let user = {
          image: response.data.avatar_url,
          name: response.data.name,
          username: response.data.login,
          location: response.data.location,
          githubLink: response.data.html_url,
          followers: response.data.followers,
          following: response.data.following,
          bio: response.data.bio,
        };
        createCard(user);
        entryPoint.appendChild(createCard(user));
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

//followerUserInfo(followersArray);

// STRETCH - GET FOLLOWERS LIST
function getFollowers(username) {
  axios
    .get(`https://api.github.com/users/${username}/followers`)
    .then((response) => {
      let array = response.data;
      let followersList = [];
      array.forEach((follower) => {
        followersList.push(follower.login);
      });
      followerUserInfo(followersList);
    })
    .catch((error) => {
      console.log(error);
    });
}

singleUserInfo('barbaralois');
getFollowers('barbaralois');
