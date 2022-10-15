const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db');

// DB connection.
const sequelize = new Sequelize(dbConfig.Database, dbConfig.User, dbConfig.Pw, {
  host: dbConfig.Host,
  dialect: dbConfig.Dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users')(sequelize, Sequelize, DataTypes);
db.books = require('./books')(sequelize, Sequelize, DataTypes);
db.borrowed_books = require('./borrowed_books')(sequelize, Sequelize, DataTypes);

module.exports = db;
