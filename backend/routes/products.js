const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();

// HÄMTA ALLA PRODUKTER
router.get('/', function(req, res) {

  const productsCollection = req.app.locals.db.collection('products');

  productsCollection.find().toArray()
  .then(results => {
    res.json(results);
  });

});

// HÄMTA SPECIFIK PRODUKT
router.get('/:id', function(req, res) {

  const productsCollection = req.app.locals.db.collection('products');
  let id = req.params.id;
  let productId = new ObjectId(id);

  productsCollection.findOne({_id: productId})
  .then(product => {
    console.log(product);
    res.json(product);
  });

})

// SKAPA PRODUKT
router.post('/add', function(req, res) {

  const productsCollection = req.app.locals.db.collection('products');

  productsCollection.insertOne(req.body)
  .then(result => {
    res.json(result);
  })
})

module.exports = router;
