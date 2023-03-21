const express = require('express');
const router = express.Router();

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post('/add', function(req, res) {
  req.app.locals.db.collection('orders').insertOne(req.body)
  .then(result => {
    res.json(result);
  })
});

// HÄMTA ALLA ORDERS
router.get('/all', function(req, res) {
  req.app.locals.db.collection('orders').find().toArray()
  .then(results => {
    res.json(results);
  });
});

module.exports = router;
