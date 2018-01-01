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

const Message = sequelize.define('message', {
  text: {
    type: Sequelize.STRING,
  },
  room: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  email_user: {
    type: Sequelize.STRING,
  },
});

module.exports.createMessage = (text, room, userEmail, cb) => {
  Message.sync().then(() =>
    Message.create({
      text,
      room,
      email_user: userEmail,
      createdAt: new Date(),
    })
      .then(result => cb(null, result))
      .catch(err => cb(err)));
};

module.exports.findUserMessages = (userEmail, room, cb) => {
  Message.findAll({ where: { email_user: userEmail, room } })
    .then(messages => cb(null, messages))
    .catch(err => cb(err));
};
