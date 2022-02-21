
firebase
  .firestore()
  .collection("user-achivments")
  .doc(telegramID)
  .get()
  .then(doc => {
    const achivments = doc.data()['achivments'];
    console.log(achivments)
    for (const achivment of achivments){
      element = document.querySelector("." + achivment);
      element.style.display = "block";
    }
  })
  .catch(err => {
    console.log(err); // eslint-disable-line no-console
  });