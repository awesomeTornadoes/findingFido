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

const Photo = sequelize.define('photo', {
  url: {
    type: Sequelize.STRING,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.addPhoto = (url, userId) => {
  Photo.sync({ force: true }).then(() =>
    Photo.create({
      url,
      id_User: userId,
    }));
};
