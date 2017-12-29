// Packages
const express = require('express');

const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

const cloudinary = require('cloudinary');

// Local files
const Message = require('./models/Message');

const User = require('./models/User');

const Pet = require('./models/Pet');

const Photo = require('./models/Photo');

const Activity = require('./models/Activity');

const Review = require('./models/Review');

const app = express();

// Check for environment variables, set port accordingly
const port = process.env.NODE_ENV === 'development' ? 9000 : 80;

// Need this to serve our bundled index.html
app.use(express.static(`${__dirname}/dist`));

// Need this to serve the logo picture
app.use(express.static(`${__dirname}/client/assets`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

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

// Takes in email and password and makes a user with only those two columns filled out
app.post('/signup', (req, res) => {
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

// Fills out the rest of the columns on a new user
app.post('/personSignup', (req, res) => {
  const {
    name,
    address,
    extra,
    userId,
  } = req.body;
  User.finishUser(userId, name, address, extra, (err, response) => {
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
  const { updateKey, updateValue, userId } = req.headers;
  User.updateUser(userId, updateKey, updateValue, (err, updated) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(updated);
    }
  });
});

// Deletes a profile
app.delete('/profile', (req, res) => {
  const { userId } = req.body;
  User.deleteUser(userId, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(202).send(result);
    }
  });
});

// Saves chat messages to the database
app.post('/chat', (req, res) => {
  const { body, userId } = req.body;
  // Store message in databse
  Message.createMessage(body, userId, (err, result) => {
    // Send message to both users, using socket.io
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

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
  const { userId } = req.body;
  Activity.getUserActivities(userId, (err, activities) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(activities);
    }
  });
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
  const { email } = req.body;
  // Gets user information based on email
  User.getUser(email, (err, userInfo) => {
    if (err) console.error(err);
    // Gets pet information based on returned user id
    Pet.getPet(userInfo.id, (error, petInfo) => {
      if (error) console.error(error);
      // Puts them in object and sends to user
      const result = { userInfo, petInfo };
      res.status(200).send(result);
    });
  });
});

// Recieves a file upload, adds it to cloudinary, then adds to the database
app.post('/photos', (req, res) => {
  const newPhoto = req.files;
  const { userId } = req.body; // Will need to update based on auth
  // Uploads to cloudinary
  cloudinary.uploader.upload(newPhoto, (result) => {
    // Uploads returned url to our database
    Photo.addPhoto(result.url, userId, (err, photo) => {
      if (err) {
        res.status(500).send(err);
      } else {
        // Sends back the new photo to the client side to be rendered
        res.status(201).send(photo);
      }
    });
  });
});

// Logs a user out, destroying their token
app.get('/signout', (req, res) => {
  // Destory token
  res.redirect('/login');
});

// Wildcard, redirects to the profile page
app.get('/*', (req, res) => {
  res.redirect('/profile');
});

// Open our connection
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
