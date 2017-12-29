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
  body: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.createMessage = (body, userId, cb) => {
  Message.sync().then(() =>
    Message.create({
      body,
      id_User: userId,
      createdAt: new Date(),
    })
      .then((result) => {
        cb(result);
      })
      .catch((err) => {
        cb(err);
      }));
};
