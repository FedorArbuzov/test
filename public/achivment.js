
firebase
  .firestore()
  .collection("user-achivments")
  .doc(telegramID)
  .get()
  .then(doc => {
    const result = doc.data()['achivments'];
    console.log(result)
  })
  .catch(err => {
    console.log(err); // eslint-disable-line no-console
  });