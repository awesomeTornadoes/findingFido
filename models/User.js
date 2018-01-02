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

// const sequelize = new Sequelize('findingFido', 'bvjcwjye', 'YkiJ4pvf6lTtuJDyp8v23KqGQoeuasvL', {
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 1000,
//   },
//   operatorsAliases: false,
// });

// Can be used to make sure your connection is open, but unnecessary in production
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  photo: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.INTEGER,
  },
  extra: {
    type: Sequelize.STRING,
  },
});

module.exports.createUser = (name, email, address, city, state, zip, extra, cb) => {
  User.sync().then(() =>
    User.create({
      name,
      email,
      address,
      city,
      state,
      zip,
      extra,
    }))
    .then(user => cb(null, user))
    .catch(err => cb(err));
};

module.exports.getUser = (email, cb) => {
  User.findOne({ where: { email } })
    .then(user => cb(null, user))
    .catch(err => cb(err));
};

module.exports.updateUser = (userEmail, updateKey, updateValue, cb) => {
  User.findOne({ where: { email: userEmail } })
    .then((user) => {
      user.updateAttributes({
        updateKey: updateValue,
      })
        .then(updated => cb(null, updated))
        .catch(err => cb(err));
    });
};

module.exports.deleteUser = (userEmail, cb) => {
  User.findOne({ where: { email: userEmail } })
    .then(user => user.destroy())
    .then(() => cb(null, 'Success'))
    .catch(err => cb(err));
};
