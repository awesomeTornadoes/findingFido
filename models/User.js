const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://bvjcwjye:YkiJ4pvf6lTtuJDyp8v23KqGQoeuasvL@baasu.db.elephantsql.com:5432/bvjcwjye', {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  photo: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  extra: {
    type: Sequelize.STRING,
  },
});

// Creates a user with only the name and email filled out
module.exports.initialCreateUser = (email, password, cb) => {
  User.sync().then(() =>
    User.create({
      name: null,
      email,
      password,
      address: null,
      extra: null,
      photo: null,
    })
      .then(user => cb(null, user))
      .catch(err => cb(err)));
};

// Fills out the rest of the columns for a new user
module.exports.finishUser = (userId, name, address, extra, cb) => {
  User.findOne({
    id: userId,
  })
    .then((user) => {
      user.updateAttributes({
        name,
        address,
        extra,
      })
        .then(result => cb(null, result))
        .catch(err => cb(err));
    });
};

module.exports.getUser = (email, cb) => {
  User.findOne({ email })
    .then(user => cb(null, user))
    .catch(err => cb(err));
};

module.exports.updateUser = (userId, updateKey, updateValue, cb) => {
  User.findOne({ id: userId })
    .then((user) => {
      user.updateAttributes({
        updateKey: updateValue,
      })
        .then(updated => cb(null, updated))
        .catch(err => cb(err));
    });
};

module.exports.deleteUser = (userId, cb) => {
  User.findOne({ id: userId })
    .then(user => user.destroy())
    .then(() => cb(null, 'Success'))
    .catch(err => cb(err));
};

// Only used in the development environment
module.exports.getUsers = (cb) => {
  User.findAll()
    .then(users => cb(null, users))
    .catch(err => cb(err));
};
