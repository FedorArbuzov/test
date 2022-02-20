const telegramID = localStorage.getItem('telegramID');
console.log(telegramID);
if (telegramID === null){
   document.querySelector('.login-form').style.display = "block";
}
else {
  document.querySelector('.login-form').style.display = "none";
}

document.querySelector('.login-form > form').addEventListener('submit', function(evt){
  evt.preventDefault();
  let inputTelegramId = document.querySelector('.telegram-input').value
  document.querySelector('.login-form').style.display = "none";
  localStorage.setItem('telegramID', inputTelegramId);
  let userDoc = firebase.firestore().collection('users').doc(localStorage.getItem('telegramID'));
  userDoc.set({}, {merge: true});

  userDoc = firebase.firestore().collection('traction').doc(localStorage.getItem('telegramID'));
  userDoc.set({}, {merge: true});

  userDoc = firebase.firestore().collection('user-achivments').doc(localStorage.getItem('telegramID'));
  userDoc.set({}, {merge: true});
})