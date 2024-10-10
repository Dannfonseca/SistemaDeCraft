const express = require('express');
const router = express.Router();
const { Item, ItemIngredient } = require('../models');
const { Profession, Tier } = require('../models/enums');

// Função recursiva para obter todos os ingredientes de um item
async function getIngredients(itemId, quantity, ingredients = {}) {
  const item = await Item.findByPk(itemId, {
    include: [{
      model: Item,
      as: 'Ingredients',
      through: { attributes: ['quantity'] }
    }]
  });

  if (item) {
    if (item.Ingredients.length > 0) {
      for (const ingredient of item.Ingredients) {
        const totalQuantity = ingredient.ItemIngredient.quantity * quantity;
        await getIngredients(ingredient.id, totalQuantity, ingredients);
      }
    } else {
      if (ingredients[itemId]) {
        ingredients[itemId].quantity += quantity;
      } else {
        ingredients[itemId] = {
          item: item,
          quantity: quantity
        };
      }
    }
  }
  return ingredients;
}

router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.render('calcular', { items, professions: Profession, tiers: Tier });
  } catch (error) {
    console.error(error);
    res.render('calcular', { error: 'Erro ao carregar os itens.' });
  }
});

router.get('/detalhes/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const ingredients = await getIngredients(itemId, 1);
    const ingredientList = Object.values(ingredients);
    res.json(ingredientList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter os ingredientes.');
  }
});

module.exports = router;

