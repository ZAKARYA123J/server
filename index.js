const express = require('express');
const app = express();
const port = 3003;
const pool = require ('./musql')
const cors = require('cors');
const nodemailer = require ('nodemailer')

app.use(express.json());
app.use(cors());
const transport = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user:'zakaryabaouali255@gmail.com',
    pass:'zkrd iptd kshk lqnv',
  }
})

app.post('/regestre', (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const message = req.body.message;

  // Insert into the database
  pool.query("INSERT INTO users (name, number, message) VALUES (?, ?, ?)", [name, number, message], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log(result);

      // Send an email using Nodemailer
      const mailOptions = {
        from: 'zakaryabaouali255@mail.com', 
        to: 'zakaryabaouali255@gmail.com', 
        subject: 'New User Registration',
        text: `New user registered with name: ${name}, number: ${number}, and message: ${message}`,
      };

      transport.sendMail(mailOptions, (emailErr, info) => {
        if (emailErr) {
          console.log(emailErr);
          res.status(500).json({ error: 'An error occurred while sending the email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ message: 'Record inserted successfully and email sent' });
        }
      });
    }
  });
});


app.listen(port, () => {
  console.log('Server running on port ' + port);
});
