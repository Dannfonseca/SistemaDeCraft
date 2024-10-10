const express = require('express');
const router = express.Router();
const { Item } = require('../models');

router.get('/items', async (req, res) => {
  const tiers = req.query.tiers.split(',').map(t => parseInt(t));
  const items = await Item.findAll({ where: { tier: tiers } });
  res.json(items);
});

router.post('/', async (req, res) => {
  const { profession, tier, itemName, ingredientId, quantity, npcPrice, marketPrice } = req.body;

  try {
    let item;
    const parsedTier = parseInt(tier);
    const parsedNpcPrice = parseFloat(npcPrice);
    const parsedMarketPrice = parseFloat(marketPrice) || null;

    if (parsedTier === 1) {
      item = await Item.create({
        name: itemName,
        profession,
        tier: parsedTier,
        npcPrice: parsedNpcPrice,
        marketPrice: parsedMarketPrice
      });
    } else {
      item = await Item.create({
        name: `Item Tier ${parsedTier}`,
        profession,
        tier: parsedTier,
        npcPrice: parsedNpcPrice,
        marketPrice: parsedMarketPrice
      });

      await ItemIngredient.create({
        itemId: item.id,
        ingredientId: parseInt(ingredientId),
        quantity: parseInt(quantity)
      });
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('inserir', { error: 'Erro ao inserir o item.', professions: Profession, tiers: Tier });
  }
});


module.exports = router;
