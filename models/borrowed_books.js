module.exports = (sequelize, Sequelize) => {
  const borrowedBooks = sequelize.define('borrowed_book', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    book_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_returned: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    review_score: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  }, {
    createdAt: false,
    updatedAt: false,
  });
  return borrowedBooks;
};
