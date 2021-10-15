let express = require('express');
let axios = require('axios');
let admin = require('firebase-admin');
const cors = require('cors');

const PORT = process.env.PORT || 5000;


const url = 'https://api.telegram.org/bot';
const apiToken = '2080851679:AAHe4ELNXqRxfymhzeSST5swFE7i5qYgjkE';

admin.initializeApp({credential: admin.credential.cert({
  "type": "service_account",
  "project_id": "exallenge",
  "private_key_id": "64a69287902dea1de5cfc3a40bd2082a3c01a8ac",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXAFUeHtKS5r0h\nT07EA2DUa9A2+4bAi1Z/VnNv0ABP+ATXtUC+81kbrkvHWDxqvcjmGWlYSp69q8v4\nq2wPUvMzN7mf9Y2TS6NG92s5k1gyC0KykmA6XRaXORfTCVHFU4nti9ox1PNcuGF/\n1vQkMKkhK+cJJuir8Zk1bmmNlGX/dX/ES0oqcDgPUdUsMHoSEtwox69bTSG88HtE\n2Dhvwc/1zmjTx+mlWaz/bdeKjoeV8K3yL1f75uuT2NohalErVDms1tOeKYu44n6+\nS++gjM+eDC0Q6LO7nnheasr6k66QJsqjFEXo75Hq2o2L1dARctalyNNo1k5s0M5s\n99+1cY9nAgMBAAECggEABMTJHoXofcGiAd8hP0+9eHiu5/x9z9kUIUO1nVre5ucr\nx4ajQDKXKcbP5d5n8j++kpWPTjOf5oas9RlrdPUnpJDHDGxrdRAa0WdWq+XZiu9p\nzbQmPKUouLa93iLSx+GpqYJa/WGPx3qyqIQIBKJGEUPiaypY9sqN1cjBJpbBoszZ\n884FhxyUFXeYjVIqVVJqcSgaL5y6J8NKYqBm8WU0TgNsltvr70l346BNUii267/6\nHxcHZza7K2eZ3JeBkI0uxb3Ri9X764yfl4A3ZnOX5UnvFnJC5srrI1PSAdbP5wuj\n+nxgZ+B+FE39hqooqawwTAUuICikVsGDenDRmb1cwQKBgQD3avO7MCLQqb4jhNQk\nKpHWVFrXbJigTA3ehHQifi+BqVgzIgBylEy4yeUmlqrWEfX6N5FZMJBdvDoJb3wf\n+sAwCgyoIGh3NFUadLK7HqE+2h+sSWXDH9lpVYuqsPTEvcmEfUId+eUjVYrBKiF0\nioNINT1SIOzjSeSYrPBPBV5a7wKBgQDedYZhsV9MRGIGu0+3WcaqL0Za3vnLdrBb\nvqHNNXSPYzFrQPnVvoXX1ooTAKJFOqDD9HY/Wa91p8r5GNJ6uZrHUxT3xkFVnxXJ\nAMqR3xX7sASHeaSEN9bAud+8hp+XxwhY7zu889BSZ8qdfYQCX1YPdaOAVzRJAXyn\nLQb+jilzCQKBgHNCDZzMBcvy5zKgtDrM4fdYgKEOY+N4ypU4Wumeov7iJsZbNp4p\n27vRwcBCO/9Riqcvr7Q+3WHtR5QRrV8wbstyQwcnYcL2TBbw+joVQMSI1GxsHM3T\nTnK1eUTg/oWQbAoeV+ii+02Ekgj+WWtzA0lmE9TopbIUQDunhKMrOxNdAoGAHT1J\nSnHr2rRqRgQ8uBa+vAO2tZ71Kj8Rcx2dWsGZ7nbVOgmyTNvb78CtKU4+Beds1hS9\nrhn1q/s//Hm8wJDAvU44RVDzqXNdg6vs9DtkQk6iacQdUZudSHul4ru3IlXwzO+0\n5GMPkKU/xm+G+GDbiPCnaukLYEUnwzlx3+eDnzECgYEAwppQjb3b+qklcoBdml2h\nY5WdLmi5NiKA54zgTfWzZtQ2Ad29yqiTAb6Giy1gvV44GqvdJtNthLLmjkq1PXrq\nP7P9Mu0yhnEa/bJI0rLj3GiCo9aKYZB3axIv6XEBbpRkL5WmPJBghdR5PZHwUqxP\nVY2zSlWHykgm8WgAEq4hxTg=\n-----END PRIVATE KEY-----\n",
  "client_email": "exallenge@appspot.gserviceaccount.com",
  "client_id": "100796253642406594133",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/exallenge%40appspot.gserviceaccount.com"
}
)});

db = admin.firestore();

var app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.post('/', async function(request, response){
  const cityRef = db.collection('cities').doc('SF');
  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
  console.log(request.body);      // your JSON
  axios.post(`${url}${apiToken}/sendPhoto`,
  {
       chat_id: 340473490,
       photo: 'AgACAgIAAxkBAANEYWl5pFfpYd3np-PSrmpDDSgVa7AAApa3MRuKrFFLXw1hMutgUuwBAAMCAAN4AAMhBA'
  })
  .then((res) => { 
      response.status(200).send(res);
  }).catch((error) => {
      response.send(error);
  });
});

app.listen(PORT);



