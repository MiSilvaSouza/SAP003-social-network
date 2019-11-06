function loginGoogle() {

  let provider = new firebase.auth.GoogleAuthProvider();  
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {        
    window.location = '#home';          
  }).catch(function(error) {
    alert('Falha na autenticação!')
    window.location = '#login';         
  });  
};

export default loginGoogle;
