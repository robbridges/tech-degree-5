
const users = [];

/*
Gets our user list from the Random user API, pushes it to an array of users and displays the users array objects to the main page.
*/
const getUsers = async () => {
  await fetch('https://randomuser.me/api/?inc=picture,name,email,location,dob,phone&nat=US&results=12')
    .then(res => res.json())
    .then(res => res.results.forEach(user => users.push(user)))
    .catch(error => console.log(`There was an error, please see the error below \n ${error.message}`));
  users.forEach(user =>displayUserData(user));
  pageSetUp();
  
}
/*
Helper method used to post user information div to the dom
@Param user {object} a  user object containining user information, contained in our user Array
*/
const displayUserData = (user) => {
  const gallery = document.querySelector('.gallery');
  const html = `
  <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city} ${user.location.state}</p>
    </div>
  </div>`
  gallery.insertAdjacentHTML('beforeend', html);
}
/*
Sets up the event listeners on all the user divs created, this is how we get a modal to display when a user is clicked on.
*/
const eventListener = () => {
  const divs = document.querySelectorAll('.card');
  divs.forEach((div,index) => div.addEventListener('click', e => {
    setUpModel(users[index]);
  }))
}
  
/*
Setting up the model to display for more user information This sets up the HTML when the onclick event is performed on our user divs. Creates modal button features.
@Param user {object} object contained in our user array 
*/
const setUpModel = (user) => {
  const gallery = document.querySelector('.gallery');
  const html = `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${user.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class="modal-text">${user.phone}</p>
          <p class="modal-text">${user.location.street.number} ${user.location.street.name}. <br> ${user.location.city}, ${user.location.state} 97204</p>
          <p class="modal-text">${user.dob.date}</p>
      </div>
  </div>

  <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
</div>`
gallery.insertAdjacentHTML("beforeend", html);
modelButtonListeners();
}
/*
Sets up event listeners for all modal objects, we call this method after the modal has been created
*/
const modelButtonListeners = () => {
  const closeButton = document.querySelector('.modal-close-btn')
  closeButton.addEventListener('click', e=> {
    document.querySelector('.modal-container').remove();
  })
}

const addSearchBar = () => {
  const searchBar = document.querySelector('.search-container');
  const searchHtml = `
  <form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`
  searchBar.insertAdjacentHTML('beforeend', searchHtml);
}
/*
Method that sets up our event listeners and adds the search bar to the page 
*/
const pageSetUp = () => {
  eventListener();
  addSearchBar();
  search();
}

const search = () => {
  console.log(users);
  const searchBar = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-submit');
  const searchText = searchBar.value;
  const filteredUser = [];
  users.forEach(user => {
    if (user.name.first.toLowerCase().includes(searchText.toLowerCase())) {
      filteredUser.push(user);
    }
  })
  console.log(filteredUser);
  
    
  
}

const searchEventListener = () => {
  const searchButton = document.querySelector('.search-submit');
  searchButton.addEventListener('click', e => {
    search();
  })

}



getUsers();

