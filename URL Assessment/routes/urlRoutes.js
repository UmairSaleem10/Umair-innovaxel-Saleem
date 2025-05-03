const express = require('express');
const router = express.Router();
const {
  createShortUrl,

} = require('../controllers/urlController');

router.get('/', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/shorten', createShortUrl);


module.exports = router;