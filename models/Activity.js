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
  location: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.DATE,
  },
  email_user: {
    type: Sequelize.STRING,
  },
});

module.exports.createActivity = (userEmail, location, time, cb) => {
  Activity.sync({ force: true }).then(() =>
    Activity.create({
      // Again, I think this is the right way to do object shorthand. We'll see
      email_user: userEmail,
      time,
      location,
    })
      .then(result => cb(null, result))
      .catch(err => cb(err)));
};

module.exports.getUserActivities = (userEmail, cb) => {
  Activity.find({ email_user: userEmail })
    .then(activities => cb(null, activities))
    .catch(err => cb(err));
};

module.exports.getActivitiesByTime = (time, cb) => {
  Activity.findAll({ time })
    .then(activities => cb(null, activities))
    .catch(err => cb(err));
};