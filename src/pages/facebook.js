function loginFacebook() {

  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {       
    window.location = '#home';          
  }).catch(function(error) {
    alert('Falha na autenticação!')
    window.location = '#login';         
  });  
};

export default loginFacebook;