module.exports = (sequelize, Sequelize, DataTypes) => {
  const users = sequelize.define('user', {
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
    books: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {
    createdAt: false,
    updatedAt: false,
  });
  return users;
};
