module.exports = (sequelize, DataTypes) => {
  const ItemIngredient = sequelize.define('ItemIngredient', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  return ItemIngredient;
};
