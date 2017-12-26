const Sequelize = require('sequelize');

const sequelize = new Sequelize('finding_fido', 'PrestonWinstead', null, {
  host: 'localhost',
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

module.exports.createUser = (name, email, password, address, extra, cb) => {
  User.sync({ force: true }).then(() => {
    return User.create({
      name: name,
      email: email,
      password: password,
      address: address,
      extra: extra,
      photo: null,
    })
      .then(user => cb(null, user))
      .catch(err => cb(err));
  });
};

const Pet = sequelize.define('pet', {
  name: {
    type: Sequelize.STRING,
  },
  kind: {
    type: Sequelize.STRING,
  },
  characteristics: {
    type: Sequelize.STRING,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.createPet = (name, kind, characteristics, userId, cb) => {
  Pet.sync({ force: true }).then(() => {
    return Pet.create({
      name: name,
      kind: kind,
      characteristics: characteristics,
      id_User: userId,
    })
      .then(pet => cb(null, pet))
      .catch(err => cb(err));
  });
};

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

module.exports.createMessage = (body, userId) => {
  Message.sync({ force: true }).then(() => {
    return Message.create({
      body: body,
      id_User: userId,
      createdAt: new Date(),
    });
  });
};

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

module.exports.createActivity = (body, location, userId, time) => {
  Activity.sync({ force: true }).then(() => {
    return Activity.create({
      body: body,
      id_User: userId,
      time: time,
      location: location,
    });
  });
};


const Photo = sequelize.define('photo', {
  url: {
    type: Sequelize.STRING,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.addPhoto = (url, userId) => {
  Photo.sync({ force: true }).then(() => {
    return Photo.create({
      url: url,
      id_User: userId,
    });
  });
};

module.exports.getUser = (email, cb) => {
  User.findOne({ email: email })
    .then(user => cb(null, user))
    .catch(err => cb(err));
};
