module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    npcPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    marketPrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {});

  return Item;
};

