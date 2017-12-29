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

const Activity = sequelize.define('activity', {
  body: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.DATE,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.createActivity = (body, location, userId, time, cb) => {
  Activity.sync({ force: true }).then(() =>
    Activity.create({
      // Again, I think this is the right way to do object shorthand. We'll see
      body,
      id_User: userId,
      time,
      location,
    })
      .then(result => cb(null, result))
      .catch(err => cb(err)));
};

module.exports.getUserActivities = (userId, cb) => {
  Activity.find({ id_User: userId })
    .then(activities => cb(null, activities))
    .catch(err => cb(err));
};
