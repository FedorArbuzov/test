let express = require('express');
let axios = require('axios');

const PORT = process.env.PORT || 5000;


const url = 'https://api.telegram.org/bot';
const apiToken = '2080851679:AAHe4ELNXqRxfymhzeSST5swFE7i5qYgjkE';

var app = express();

app.use(express.json());

app.post('/', function(request, response){
  console.log(request.body);      // your JSON
  axios.post(`${url}${apiToken}/sendMessage`,
  {
       chat_id: 340473490,
       text: 'hello back 👋'
  })
  .then((res) => { 
      response.status(200).send(res);
  }).catch((error) => {
      response.send(error);
  });
});

app.listen(PORT);



