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

module.exports.initialCreateUser = (email, password, cb) => {
  User.sync().then(() => {
    return User.create({
      name: null,
      email: email,
      password: password,
      address: null,
      extra: null,
      photo: null,
    })
      .then(user => cb(null, user))
      .catch(err => cb(err));
  });
};

module.exports.finishUser = (userId, name, addess, extra, cb) => {
  User.findOne({
    id: userId
  })
    .then((user) => {
      user.updateAttributes({
        name: name,
        address: address,
        extra: extra,
      })
        .then((result) => {
          cb(result);
        })
        .catch((err) => {
          cb(err);
        });
    });
};

module.exports.getUser = (email, cb) => {
  User.findOne({ email: email })
    .then(user => cb(null, user))
    .catch(err => cb(err));
};

module.exports.getUsers = (cb) => {
  User.findAll()
    .then((users) => {
      cb(null, users);
    })
    .catch((err) => {
      cb(err);
    });
};