const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');


const api_key = 'key-3559389dc23ccab1138dea68048a8569';
const domain = 'sandboxdaeb584343b443879b1f54e764381fd6.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: domain});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
  });

app.post('/', (request, response) => {
  const email = request.body.email;


const data = {
  from: 'Happy User <matangini4810.be22@chitkara.edu.in>',
  to: email,
  subject: 'Hey! welcome....',
  text: 'Trying the Mailgun Brilliance....!'
};
mg.messages().send(data, (error, body) => {
    if (error) {
      console.error('Error sending email via Mailgun:', error);
    } else {
      console.log('Email sent successfully via Mailgun');
    }
    console.log(body);
    response.sendFile(__dirname+'/index.html');
  });
});

app.listen(8084, function (request, response) 
  {
    console.log('server is running');
    });
