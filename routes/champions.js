const express = require('express');
const router = express.Router();
const Champion = require('../models/Champion');

// Get All Champions
router.get('/', async (req, res) => {
  try {
    const champions = await Champion.find();
    res.send(champions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One Champion
router.get('/:id', getChampions, (req, res) => {
  res.json(res.champion);
});

// Post New Champion
router.post('/', async (req, res) => {
  const champion = new Champion(req.body);
  try {
    const newChampion = await champion.save();
    res.status(201).json(newChampion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Champion
router.patch('/:id', getChampions, async (req, res) => {
  if (req.body.winner_data.name != null) {
    res.champion.winner_data.name = req.body.winner_data.name;
  }
  try {
    const updatedChampion = await res.champion.save();
    res.json(updatedChampion);
  } catch (err) {
    res.status(400).message({ message: err.message });
  }
});

// Delete Champion
router.delete('/:id', getChampions, async (req, res) => {
  try {
    await res.champion.remove();
    res.json({ message: `Deleted a champion: ${res.champion}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getChampions(req, res, next) {
  let champion;
  try {
    champion = await Champion.findById(req.params.id);
    if (champion == null) {
      return res.status(400).json({ message: 'Cannot find champs!' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.champion = champion;
  next();
}

module.exports = router;

// 'use strict';

// const express = require('express');
// const router = express.Router();
// const { champion, addChampion } = require('../controllers/championController');

// router.get('/champions', champion);

// router
//   .route('/champions/:id')
//   .get((req, res) => {
//     res.send(`hi get api/champions/${req.params.id}`);
//   })
//   .put((req, res) => {
//     res.send(`hi put api/champions/${req.params.id}`);
//   });

// module.exports = router;
