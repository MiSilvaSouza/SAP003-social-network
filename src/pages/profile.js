import Button from '../components/button.js';
import Logo from '../components/logo.js';

function signOut() {  
  firebase.auth().signOut()
  .then(function () {
    window.location = '#login';
    
  }).catch(function (error) {
    
  });
};

function profile() {
  window.app.filterPost();
  const template = `
    <header class= "header-home">
      ${Logo({ class: "logonav" })}
      <nav>
        <ul>
          <li><a href="#home" class ="button-home"><i class="fas fa-home"></i></a></li>
          <li>${Button({ class: "button-out", onClick: signOut, title:'Log Out <i class="fas fa-sign-out-alt"></i>' })}</li>
        </ul>
      </nav>         
    </header>   
    <div class= "img">
      <img class="img-user" src="./img/profile_girl.png"/> 
    </div>
    <div class= "post-area"></div>
    <div class="profile-area">     
      <h1 class="profile-area">Nome: ${firebase.auth().currentUser.displayName}</h1>
      <h2 class="profile-area">E-mail: ${firebase.auth().currentUser.email}</h2>      
    </div>       
    <ul class="feed"></ul>   
  `;
  return template;
}

export default profile;