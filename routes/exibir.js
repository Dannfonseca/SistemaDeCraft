const express = require('express');
const router = express.Router();
const { Item } = require('../models');

router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.render('exibir', { items });
  } catch (error) {
    console.error(error);
    res.render('exibir', { error: 'Erro ao carregar os itens.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, npcPrice, marketPrice } = req.body;
    await Item.update(
      { name, npcPrice: parseFloat(npcPrice), marketPrice: parseFloat(marketPrice) },
      { where: { id } }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar o item.');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Item.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar o item.');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, npcPrice, marketPrice } = req.body;
    await Item.update(
      {
        name,
        npcPrice: parseFloat(npcPrice),
        marketPrice: parseFloat(marketPrice)
      },
      { where: { id } }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar o item.');
  }
});




module.exports = router;
