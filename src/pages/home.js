import Button from '../components/button.js';
import Logo from '../components/logo.js';
import Input from '../components/input.js';

function Home() {
  const template = `
    ${Logo()}
    <br>
    ${Input({ class: 'js-email-input', type: 'email', placeholder: 'Email' })}
    ${Input({ class: 'js-password-input', type: 'password', placeholder: 'Senha' })}    
    <br>
    ${Button({ id: 'enviar', title: 'Enviar' })}
    
    <p>Ou acesse com...</p>
   
    <section>Não tem uma conta? <a>REGISTRE-SE</a></section>
  `;

  return template;
}

export default Home;
