const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const Message = require('./models/Message');

const User = require('./models/User');

const Pet = require('./models/Pet');

const Photo = require('./models/Photo');

const Activity = require('./models/Activity');

const Review = require('./models/Review');

const app = express();

const jwt = require('express-jwt');

const jwks = require('jwks-rsa');

const cors = require('cors');

// Check for environment variables, set port accordingly
const port = process.env.NODE_ENV === 'development' ? 9000 : 80;

// Need this to serve our bundled index.html
app.use(express.static(`${__dirname}/dist`));

// Need this to serve the logo picture
app.use(express.static(`${__dirname}/src/assets`));

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

app.post('/login', authCheck, (req, res) => {

  res.send(req.body); // check to see I get the data back
  // Pull email from request, assign it to 'email'
  // Pull password from request, assign it to 'password'
  db.getUser(email, (err, user) => {
/*******************************************************
 Delete in production environment
 *********************************************************/
app.get('/users', (req, res) => {
  User.getUsers((err, users) => {
    if (err) {
      console.error(err);
    } else {
      res.send(users);
    }
  });
});
/*******************************************************
  End of what to delete in production environment
 *********************************************************/

// Logs in user if they exist, sends them to signup if not
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // const email = req.body.email;
  // const password = req.body.password;
  User.getUser(email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(404).redirect('/signup');
    } else {
      // Check passwords. If match
      // Send token
      res.status(201).send('Successful login');
      // Otherwise, send that there was an error with the password
    }
  });
});

app.post('/personSignup', authCheck, (req, res) => {
  res.send(req.body);
  db.createUser(name, email, password, address, extra, (err, response) => {

// Takes in email and password and makes a user with only those two columns filled out
app.post('/signup', (req, res) => {
  // I think this is the proper way to do destructing. We'll find out if not
  const { email, password } = req.body;
  User.initialCreateUser(email, password, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sorry, something went wrong');
    } else {
      res.send('success', response);
    }
  });
});

app.post('/schedule', authCheck, (req, res) => {
  res.send(req.body);
});


app.post('/petSignup', authCheck, (req, res) => {
  // { kind: "Dog", petName: "Doggy", place: "Central Park", petInfo: "super fun" }
  res.send(req.body);
  // Pull info from req
  db.createPet(name, kind, characteristics, userId, (err, pet) => {
    
app.post('/schedule', (req, res) => {
  res.send(req.body);
});

// Takes in information about the pet, puts it in a pet table with a link to the user
app.post('/petSignup', (req, res) => {
  const {
    userId, // May need to update userId
    name,
    kind,
    characteristics,
  } = req.body;
  Pet.createPet(name, kind, characteristics, userId, (err, pet) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(pet);
    }
  });
});
    
app.get('/profile', (req, res) => {
  // Requires auth
  // If the requested profile is that user's profile
  // res.sendFile(path.join(__dirname, '/src/components/app/person-signup/person-signup.component.html'));
  // Otherwise
  // Send them the external profile page

// Fills out the rest of the columns on a new user
app.post('/personSignup', (req, res) => {
  // const userId; // Pull out user id
  const { name, address, extra } = req.body;
  User.finishUser(null, name, address, extra, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      // Send token
      res.send(response);
    }
  });
});

// Updates profile information
app.put('/profile', (req, res) => {
  // Send which part of the profile will be updated on headers
  // Figure out what needs to be updated
  // Update that user's database entry
  // Redirect to profile get, so they can see it updated with the changes
});

// Deletes a profile
app.delete('/profile', (req, res) => {
  // Delete the user's profile
  
  res.status(202).send('Successfully deleted');
});

// Saves chat messages to the database
app.post('/chat', (req, res) => {
  const { body, userId } = req.body;
  Message.createMessage(body, userId, (result) => {
    res.send(result);
  });
  // Store message in databse
  // Send message to both users, using socket.io
});

app.post('/review', (req, res) => {
  // Add review to database
  // Send a thank you page
  // Send them to the homepage
});

app.get('/search', (req, res) => {
  // Should be able to handle searches src side without a post handler
  res.sendFile(path.join(__dirname, '/src/search.html'));
// Saves reviews to the database
app.post('/review', (req, res) => {
  const { user, body } = req.body;
  Review.createReview(user, body, (err, review) => {
    if (err) {
      console.error(err);
      res.status(404).send(err);
    } else {
      res.status(201).send(review);
    }
  });
});

// Searches for people who are looking to meet someone at the same time
app.post('/search', (req, res) => {
  // Search the database for people who are looking for someone at that time
});

// Finds a sepecific user's activities for the profile page
app.get('/activities/*', (req, res) => {
  // Pull user id out of request params
  // Query database for that user's activities
  // Respond with the activities
});

// Adds an activity to the database
app.post('/activities', (req, res) => {
  const {
    userId, // May need to update userId
    description,
    location,
    time,
  } = req.body;
  Activity.createActivity(description, location, userId, time, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

// Sends information to fill out the individual dashboard
app.get('/petDashboard', (req, res) => {
  // Get information for user
  // Get information for pet
  // Send response with information
});

// Logs a user out, destroying their token
app.get('/signout', (req, res) => {
  // Destory token
  res.redirect('/login');
});

// Wildcard, redirects to the profile page
app.get('/*', (req, res) => {
  res.redirect('/chat');
});

// Open our connection
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
