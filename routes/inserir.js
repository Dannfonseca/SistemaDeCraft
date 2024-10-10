const express = require('express');
const router = express.Router();
const { Item, ItemIngredient } = require('../models');
const { Profession, Tier } = require('../models/enums');

router.get('/', async (req, res) => {
  res.render('inserir', { professions: Profession, tiers: Tier });
});

router.post('/', async (req, res) => {
  const { profession, tier, itemName, npcPrice, marketPrice } = req.body;

  try {
    let item;
    const parsedTier = parseInt(tier);
    const parsedNpcPrice = parseFloat(npcPrice);
    const parsedMarketPrice = parseFloat(marketPrice) || null;

    item = await Item.create({
      name: itemName,
      profession,
      tier: parsedTier,
      npcPrice: parsedNpcPrice,
      marketPrice: parsedMarketPrice
    });

    if (parsedTier > 1 && req.body.ingredients) {
      const ingredients = req.body.ingredients;
      for (const key in ingredients) {
        const ingredientId = parseInt(ingredients[key]['id']);
        const quantity = parseInt(ingredients[key]['quantity']);
        await ItemIngredient.create({
          itemId: item.id,
          ingredientId: ingredientId,
          quantity: quantity
        });
      }
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('inserir', { error: 'Erro ao inserir o item.', professions: Profession, tiers: Tier });
  }
});

module.exports = router;

