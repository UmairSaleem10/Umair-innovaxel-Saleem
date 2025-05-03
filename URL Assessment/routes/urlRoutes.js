const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  redirectUrl,
  getUrlDetails,
  updateUrl,
  deleteUrl
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
router.get('/:shortCode', redirectUrl);
router.get('/:shortCode/details', getUrlDetails);
router.put('/:shortCode', updateUrl);
router.delete('/:shortCode', deleteUrl);

module.exports = router;