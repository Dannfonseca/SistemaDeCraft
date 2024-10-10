const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar os modelos
db.Item = require('./item')(sequelize, Sequelize);
db.ItemIngredient = require('./itemIngredient')(sequelize, Sequelize);

// Definir as associações
db.Item.belongsToMany(db.Item, {
  as: 'Ingredients',
  through: db.ItemIngredient,
  foreignKey: 'itemId',
  otherKey: 'ingredientId'
});


module.exports = db;
