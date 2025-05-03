const Url = require('../models/Url');
const shortid = require('shortid');
const validator = require('validator');

// createShortUrl 
exports.createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || !validator.isURL(url)) {
      return res.status(400).json({ error: 'Invalid URL' }); // for error handle
    }

    let existingUrl = await Url.findOne({ originalUrl: url }); 
    
    if (existingUrl) {
      return res.json(existingUrl);
    }

    const shortCode = shortid.generate();
    const newUrl = new Url({
      originalUrl: url,
      shortCode
    });

    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// for get url 
exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.accessCount += 1;
    await url.save();
    
    res.redirect(url.originalUrl.includes('://') ? url.originalUrl : `http://${url.originalUrl}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// for get details like to check access count 
exports.getUrlDetails = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};