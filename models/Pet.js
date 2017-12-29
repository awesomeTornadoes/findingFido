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
  Pet.sync().then(() =>
    Pet.create({
      name,
      kind,
      characteristics,
      id_User: userId,
    })
      .then(pet => cb(null, pet))
      .catch(err => cb(err)));
};

module.exports.getPet = (userId, cb) => {
  Pet.findOne({ id_User: userId })
    .then(pet => cb(null, pet))
    .catch(err => cb(err));
};

module.exports.updatePet = (userId, updateKey, updateValue, cb) => {
  Pet.findOne({ id_User: userId })
    .then(pet => pet.updateAttributes({ updateKey: updateValue }))
    .then(updated => cb(null, updated))
    .catch(err => cb(err));
};
