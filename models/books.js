module.exports = (sequelize, Sequelize) => {
  const books = sequelize.define('book', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    score: {
      type: Sequelize.REAL,
      allowNull: true,
    },
    total_borrow: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    is_available: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  }, {
    createdAt: false,
    updatedAt: false,
  });
  return books;
};
