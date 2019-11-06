import login from './pages/login.js';
import register from './pages/register.js';
import home from './pages/home.js';
import profile from './pages/profile.js';


function locationHashChanged() {
  firebase.auth().onAuthStateChanged(function(user) {
    switch (location.hash) {

      case '#register': 
        user ? window.location = '#home' : 
        document.querySelector('main').innerHTML = register();
        break;

      case '#home': 
        user ? document.querySelector('main').innerHTML = home() :
        window.location = '#login';        
        break;       
      
      case '#login': 
        user ? window.location = '#home' : 
        document.querySelector('main').innerHTML = login();
        break;

      case '#profile': 
        user ? document.querySelector('main').innerHTML = profile() :
        window.location = '#login';        
        break;

      default:
        window.location = '#login'

    }
  })        
}

window.addEventListener("load", locationHashChanged, false);
window.addEventListener("hashchange", locationHashChanged, false);

