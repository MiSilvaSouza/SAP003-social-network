import Button from '../components/button.js';
import savePost from '../pages/post.js';
import Logo from '../components/logo.js';

function signOut() {  
  firebase.auth().signOut()
  .then(function () {
    window.location = '#login.js';    
  })
};

function home() {
  app.loadPost();  
  const template = `
    <header class= "header-home">
     ${Logo({ class: "logonav" })} 
     <nav>
      <ul>
        <li><h1 class="id-user">Olá, ${firebase.auth().currentUser.displayName}</h1></li>
        <li>${Button({ class: "button-out", onClick: signOut, title:'Log Out <i class="fas fa-sign-out-alt"></i>' })}</li>
      </ul> 
    </nav>         
    </header>     
    <div class= "img">
      <a href ='#profile'><img class="img-user" src="./img/profile_girl.png"/></a>
    </div>
    <div class ="post-area">            
      <textarea name="post" class="post" placeholder="O que você quer trocar?"></textarea>    
    <form class="option">
      <input type="radio" name="privacy" class="privacy" checked>      
      <label for="public"><i class="fas fa-lock-open"></i></label>
      <input type="radio" name="privacy" class="privacy">
      <label for="privacy"><i class="fas fa-lock"></i></label>
      ${Button({ class: "button-send", onClick: savePost, title:'<i class="fas fa-paper-plane"></i>' })}
    </form>  
    </div>    
    <ul class="feed"></ul>      
  `;    

  return template;
}

export default home;



