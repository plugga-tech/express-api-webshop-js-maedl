const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();

// HÄMTA ALLA PRODUKTER
router.get('/', function(req, res) {

  req.app.locals.db.collection('products').find().toArray()
  .then(results => {
    res.json(results);
  });

});

// HÄMTA SPECIFIK PRODUKT
router.get('/:id', function(req, res) {

  let id = req.params.id;
  let productId = new ObjectId(id);

  req.app.locals.db.collection('products').findOne({_id: productId})
  .then(product => {
    console.log(product);
    res.json(product);
  });

})

// SKAPA PRODUKT
router.post('/add', function(req, res) {

  req.app.locals.db.collection('products').insertOne(req.body)
  .then(result => {
    res.json(result);
  })
})

module.exports = router;
