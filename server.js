const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const db = require('./models/findingFidoModels');

const app = express();

const port = process.env.PORT || 9000;

// app.use(express.static(__dirname, '/client'));

app.use(express.static(`${__dirname}/dist`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  // If the user is logged in
  // Send them their own profile
  // Otherwise
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/login.html'));
});

app.post('/login', (req, res) => {
  // Pull email from request, assign it to 'email'
  // Pull password from request, assign it to 'password'
  db.getUser(email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(404).redirect('/signup');
    } else {
      // Check passwords. If match
      // Send token
      res.status(201).redirect('/profile');
    }
  });
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup1.html'));
});

app.post('/signup', (req, res) => {
  db.createUser(name, email, password, address, extra, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sorry, something went wrong');
    } else {
      // If they have a pet
      res.status(201).redirect('/signup2');
      // If they don't have a pet, redirect to signup 3
    }
  });
});

app.get('/signup2', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup2.html'));
});

app.post('/signup2', (req, res) => {
  // Pull info from req
  db.createPet(name, kind, characteristics, userId, (err, pet) => {
    if (err) {
      res.status(500).send('Sorry, there was an issue');
    } else {
      res.status(201).redirect('/signup3');
    }
  });
});

app.get('/signup3', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup3.html'));
});

app.post('/signup3', (req, res) => {
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
  // Add review to database
  // Send a thank you page
  // Send them to the homepage
});

app.get('/search', (req, res) => {
  // Should be able to handle searches client side without a post handler
  res.sendFile(path.join(__dirname, '/client/search.html'));
});

app.get('/signout', (req, res) => {
  // Destory token
  // Redirect to login page
});

app.get('/*', (req, res) => {
  res.redirect('/profile');
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
