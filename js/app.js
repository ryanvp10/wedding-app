const form = document.getElementById('comments');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('comments').add({
       name: form.name.value,
       comment: form.comment.value,
       timestamp: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
       kehadiran: form.kehadiran.value

    });
    form.name.value = '';
    form.comment.value = '';
});
   
   const div = document.querySelector('.views');


   renderList = (doc) => {

      var main_div = document.createElement('div');
      var card_body = document.createElement('div');
      var name = document.createElement('h5');
      var timestamp = document.createElement('h6');
      var comment = document.createElement('p');
      var kehadiran = document.createElement('p');

      main_div.setAttribute('class','card mt-3 kartu');
      main_div.setAttribute('style','width : 100%');
      card_body.setAttribute('class','card-body');
      card_body.setAttribute('style','margin-top : 20px');
      name.setAttribute('class','card-title titles');
      timestamp.setAttribute('class','card-subtitle mb-2 text-muted times');
      comment.setAttribute('class','card-text message');
      kehadiran.setAttribute('class','card-text message');

      
      var unix = doc.data().timestamp.toDate();

      var how = unix.toLocaleString('en-GB' , { timeZone: 'UTC'});

      name.textContent = doc.data().name;
      timestamp.textContent = how;
      comment.textContent = doc.data().comment;
      kehadiran.textContent = doc.data().kehadiran;

      card_body.appendChild(name);
      card_body.appendChild(timestamp);
      card_body.appendChild(comment);
      card_body.appendChild(kehadiran);
      main_div.appendChild(card_body);
      div.appendChild(main_div);
   }
   db.collection('comments').onSnapshot(snap => {

      let changes = snap.docChanges();
      changes.forEach(change => {
         if (change.type =='added'){
            renderList(change.doc);
            console.log(change.doc.data());
         }        
      });
   });