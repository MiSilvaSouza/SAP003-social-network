function loginFacebook() {

  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {       
    window.location = '#home.js';          
  }).catch(function(error) {
    alert('Falha na autenticação!')
    window.location = '#login.js';         
  });  
};

export default loginFacebook;