const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const db = require('./models/findingFidoModels');

const app = express();

const port = process.env.PORT || 9000;

// Need this to serve our bundled index.html
app.use(express.static(`${__dirname}/dist`));
// Need this to serve the logo picture
app.use(express.static(`${__dirname}/client/assets`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // If the user is logged in
  // Send them their own profile
  // Otherwise
  // Note on talking about this, as the front-end is built out of components and angular router on front end exist
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  // Problem as our client side is bundled and served from distribution
  res.sendFile(path.join(__dirname, '/client/login.html'));
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Lili checking front-end send information from LoginComponent
  // {email: bla, password: bla}
  // res.send(req.body); // check to see I get the data back
  db.getUser(email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(404).redirect('/signup');
    } else {
      // Check passwords. If match
      // Send token
      res.status(201).redirect('/profile');
      // Otherwise, send that there was an error with the password
    }
  });
});

app.post('/signup', (req, res) => {
  console.log(`signup${req.body}`);
  res.send(req.body);
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup1.html'));
});

app.post('/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const extra = req.body.extra;
  db.createUser(name, email, password, address, extra, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sorry, something went wrong');
    } else {
      // If they have a pet
      res.status(201).redirect('/petSignup');
      // If they don't have a pet, redirect to signup 3
    }
  });
});

app.get('/petSignup', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/petSignup.html'));
});

app.post('/petSignup', (req, res) => {
  const name = req.body.name;
  const kind = req.body.kind;
  const characteristics = req.body.characteristics;
  db.createPet(name, kind, characteristics, userId, (err, pet) => {
    if (err) {
      res.status(500).send('Sorry, there was an issue');
    } else {
      res.status(201).redirect('/personSignup');
    }
  });
});

app.get('/personSignup', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/personSignup.html'));
});

app.post('/personSignup', (req, res) => {
  // Update user with full information
  // Store information in the database
  // Send auth token
  // Redirect to profile page
});

app.get('/profile', (req, res) => {
  // Requires auth
  // If the requested profile is that user's profile
  res.sendFile(path.join(__dirname, '/client/profile.html'));
  // Otherwise
  // Send them the external profile page
});

app.put('/profile', (req, res) => {
  // Send which part of the profile will be updated on headers
  // Figure out what needs to be updated
  // Update that user's database entry
  // Redirect to profile get, so they can see it updated with the changes
});

app.delete('/profile', (req, res) => {
  // Delete the user's profile
  res.redirect('/signup');
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/chat.html'));
});

app.post('/chat', (req, res) => {
  // Store message in databse
  // Send message to both users, using socket.io
});

app.get('/review', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/review.html'));
});

app.post('/review', (req, res) => {
  db.createReview(user, body, (err, user) => {
    if (err) {
      console.error(err);
      res.status(404).send(err);
    } else {
      res.status(201).redirect('/profile');
    }
  });
});

app.get('/search', (req, res) => {
  // Should be able to handle searches client side without a post handler
  res.sendFile(path.join(__dirname, '/client/search.html'));
});

app.get('/signout', (req, res) => {
  // Destory token
  res.redirect('/login');
});

app.get('/*', (req, res) => {
  res.redirect('/profile');
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
