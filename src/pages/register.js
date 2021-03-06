import Button from '../components/button.js';
import Logo from '../components/logo.js';
import Input from '../components/input.js';


function criarLogin() {
  const name = document.querySelector('.js-namefull-input').value;
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function () {    
    firebase.auth().currentUser.updateProfile({
      displayName: name
    })

    uid = firebase.auth().currentUser.uid

    if (uid != null) {      
      window.location = '#home';      
      db.collection('users').add({
        name: name,
        email: email,
        uid: uid        
      })      
    }   
  })  
  .catch(function (error) {       
    let errorCode = error.code;    

    if (errorCode === 'auth/weak-password') {
      alert('A senha precisa ter no mínimo 6 dígitos!')      
      window.location = '#login';
      window.location = '#register';     
    } else if (errorCode === 'auth/invalid-email') {
      alert('Digite um e-mail válido!')
      window.location = '#login';
      window.location = '#register';      
    } else if (errorCode === 'auth/email-already-in-use') {
      alert('Este e-mail já foi utilizado!')
      window.location = '#login';
      window.location = '#register';      
    }      
  });
}

function register() {
  const template = `
    <div class="login">   
      ${Logo({ class: "logo"})}
    <div class="login-form">   
      <form>    
        ${Input({ class: 'js-namefull-input', type: 'text', placeholder: 'Nome Completo' })}    
        ${Input({ class: 'js-email-input', type: 'email', placeholder: 'Email' })}    
        ${Input({ class: 'js-password-input', type: 'password', placeholder: 'Senha' })}    
        ${Button({ class: "primary-button", onClick: criarLogin, title: 'CADASTRAR' })}
      </form>
    </div>
    </div>
    `;

  return template;
};

export default register;



