const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const db = require('./models/findingFidoModels');

const app = express();

const jwt = require('express-jwt');

const jwks = require('jwks-rsa');

const cors = require('cors');

const port = process.env.PORT || 9000;

// Need this to serve our bundled index.html
app.use(express.static(`${__dirname}/dist`));
// Need this to serve the logo picture
app.use(express.static(`${__dirname}/client/assets`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const authCheck  = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://findo.auth0.com/.well-known/jwks.json',
  }),
  audience: 'http://localhost:9000',
  issuer: 'https://findo.auth0.com/',
  algorithms: ['RS256'],
});

// app.get('/', (req, res) => {
//   // If the user is logged in
//   // Send them their own profile
//   // Otherwise
//   // Note on talking about this, as the front-end is built out of components and angular router on front end exist
//   res.redirect('/login');
// });

// app.get('/login', (req, res) => {
//   // Problem as our client side is bundled and served from distribution
//   res.sendFile(path.join(__dirname, '/client/login.html'));
// });

app.post('/login', (req, res) => {
  // Lili checking front-end send information from LoginComponent
  // {email: bla, password: bla}
  console.log(`login${req.body}`);
  res.send(req.body); // check to see I get the data back
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

app.post('/signup', (req, res) => {
  console.log(`signup${req.body}`);
  res.send(req.body);
});

// app.get('/signup', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/signup1.html'));
// });

// app.post('/signup', (req, res) => {
app.post('/personSignup', (req, res) => {
  console.log(`person${req.body}`);
  res.send(req.body);
  // { name: "amelie", address1: "2823 Ursulines Ave", city: "NEW ORLEANS", state: "LA", zip: "70119", extra: I am a girl }
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

// app.get('/signup2', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/signup2.html'));
// });
// testing the schedule
app.post('/schedule', (req, res) => {
  res.send(req.body);
});

// app.post('/signup2', (req, res) => {
app.post('/petSignup', (req, res) => {
  console.log(`pet${req.body}`);
  // { kind: "Dog", petName: "Doggy", place: "Central Park", petInfo: "super fun" }
  res.send(req.body);
  // Pull info from req
  db.createPet(name, kind, characteristics, userId, (err, pet) => {
    if (err) {
      res.status(500).send('Sorry, there was an issue');
    } else {
      res.status(201).redirect('/signup3');
    }
  });
});

// app.get('/signup3', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/signup3.html'));
// });

app.post('/signup3', (req, res) => {
  // Update user with full information
  // Store information in the database
  // Send auth token
  // Redirect to profile page
});

app.get('/profile', (req, res) => {
  // Requires auth
  // If the requested profile is that user's profile
  res.sendFile(path.join(__dirname, '/client/components/app/person-signup/person-signup.component.html'));
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
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
