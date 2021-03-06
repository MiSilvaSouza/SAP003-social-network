import Button from '../components/button.js';

window.app = {
  loadPost,
  filterPost
};

function savePost() {
  const post = document.querySelector('.post').value;
  const uid = firebase.auth().currentUser.uid;
  const privacy = document.getElementsByName('privacy');
  let optionPrivacy = '';
  
  if (post === '') {    
    alert('Ops! Você não disse o que quer trocar.')

  } else {
    if (privacy[0].checked) {
      optionPrivacy = 'public'
    } else {
      optionPrivacy = 'privacy'
    }

    db.collection('post').add({
      post,
      likes: 0,    
      uid,
      privacy: optionPrivacy,
      idname: firebase.auth().currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),    
    })
    .then(() => {    
      app.loadPost()
    })
    document.querySelector('.post').value = '';  
  }  
};

function addPost(post) {
  const feed = document.querySelector('.feed');   
  const privacy = post.data().privacy;  
  
  if (privacy === 'public') {
  const feedPost = `  
  <li data-id= '${post.id}' class="post-list">
  Publicado por<span class= "idname"> ${post.data().idname}</span>  
  <span class="date-hour">${post.data().timestamp.toDate().toLocaleString('pt-BR')}</span>
  <p class="border"></p>
  <div class="text-post" data-id='${post.id}'>
    ${post.data().post}
  </div> 
  <p class="border"></p>
  ${Button({ dataId: post.id, class: "button-feed", onClick: countLikes, title:'💛' })} 
  ${post.data().likes}
  ${Button({ dataId: post.id, class: "button-feed", onClick: showComments, title:'💬' })} 
  <p class="border"></p>  
  <textarea name="text-comment" class="text-comment hideComments" data-id= '${post.id}' placeholder="Comenta aqui! :)"></textarea>
  ${Button({ dataId:post.id, class: "button-save", onClick: saveComments, title:'✅' })}  
  <div class="comments" data-id='${post.id}'></div>  
  </li>  
  `
  
  db.collection(`post/${post.id}/comments`).orderBy('timestamp', 'desc').get()
  .then((snapcomments) => {
    snapcomments.forEach((comment) => {
      const comments = document.querySelector(`.comments[data-id='${post.id}']`);
      
      comments.innerHTML += `
      <span>Comentado por <span class= "idname">${comment.data().idname}</span>      
      ${comment.data().timestamp.toDate().toLocaleString('pt-BR')}
      ${Button({ id: comment.id, dataId: post.id, uid: comment.data().uid, class: "button-delcom", onClick: deleteCom, title:'🗑' })}      
      <p>${comment.data().textComment}</p> 
      <p class="border"></p>      
      `          
    })
    
  })
  feed.innerHTML += feedPost;  
  } 
};


function addPostProfile(post) {
  const feed = document.querySelector('.feed');
  const feedPost = `  
  <li data-id= '${post.id}' class="post-list">
  <span class= "idname">${post.data().idname}:</span>
  <p class="border"></p>
  <div class="text-post" data-id='${post.id}'>
  ${post.data().post}
  </div>  
  <p class="border"></p>
  ${Button({ dataId: post.id, class: "button-feed", onClick: editPost, title:'🖍' })}    
  ${Button({ dataId: post.id, class: "button-feed", onClick: deletePost, title:'🗑' })}
  ${Button({ dataId: post.id, class: "button-feed", onClick: changePrivacy, title:'🔓' })}
  ${Button({ dataId: post.id, class: "button-save", onClick: saveEdit, title:'✅' })}   
  <span class="date-hour">${post.data().timestamp.toDate().toLocaleString('pt-BR')}</span>    
  </li>  
  `
  feed.innerHTML += feedPost;
};

function loadPost() {     
  db.collection('post').orderBy('timestamp', 'desc')  
  .get()
  .then((snap) => {
    document.querySelector('.feed').innerHTML = '';
    snap.forEach(post => {
      addPost(post)
    })
  })
};

function filterPost() {
  const user = firebase.auth().currentUser.uid;  
  db.collection('post')    
  .where('uid', '==', user)  
  .get()
  .then((snap) => {
    document.querySelector('.feed').innerHTML = '';
    snap.forEach(post => {
      addPostProfile(post)
    })
  })
};

function countLikes(event) {
  const id = event.target.dataset.id;  
  db.collection('post').doc(id).get()
  .then((post => {
    const countlike = (post.data().likes) + 1;
    db.collection('post').doc(id).update({
      likes: countlike
    });
    app.loadPost();
  }))  
};

function changePrivacy(event) {
  const id = event.target.dataset.id;  
  db.collection('post').doc(id).get()
  .then(() => {
    const upPrivacy = 'public';
    db.collection('post').doc(id).update({
      privacy: upPrivacy
    });
    app.loadPost();
  })  
};

function showComments(event){
  const id = event.target.dataset.id;  
  const comments = document.querySelector(`.text-comment[data-id='${id}']`);
  comments.classList.remove('hideComments');
  const saveButton = document.querySelector(`.button-save[data-id='${id}']`);
  saveButton.classList.add('show');  
};

function saveComments(event) {    
  const id = event.target.dataset.id;  
  const textComment = document.querySelector(`.text-comment[data-id='${id}']`).value;
  const uid = firebase.auth().currentUser.uid;  
  
  db.collection(`post/${id}/comments`).add({
    textComment,    
    uid,
    postId: id,
    idname: firebase.auth().currentUser.displayName,    
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),    
  })
  .then(() => {
        
    app.loadPost();
    
  })    
}; 

function editPost(event) {
  const id = event.target.dataset.id; 
  const postEdit = document.querySelector(`.text-post[data-id='${id}']`);
  const saveButton = document.querySelector(`.button-save[data-id='${id}']`);
  saveButton.classList.add('show');
  postEdit.setAttribute('contenteditable', 'true');
  postEdit.focus()  
};

function saveEdit(event) {
  const id = event.target.dataset.id;
  event.target.classList.remove('show');
  const post = document.querySelector(`.text-post[data-id='${id}']`).textContent.trim();
  db.collection('post').doc(id).update({post})  
};

function deletePost(event) {
  const id = event.target.dataset.id;  
  db.collection('post').doc(id).delete();  
  event.target.parentElement.remove();
};

function deleteCom(event) {  
  const idPost = event.target.dataset.id;  
  const idComment = event.target.id;
  const currentUser = firebase.auth().currentUser.uid;
  const userComment = event.target.dataset.uid;

  if (userComment === currentUser) {   
    db.collection(`post/${idPost}/comments`).doc(idComment).delete();
    event.target.parentElement.remove();            
    app.loadPost();
  }
};



export default savePost;