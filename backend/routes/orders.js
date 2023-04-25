const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post('/add', function(req, res) {

  let answer = {
    success: false
  }

  ordersCollection = req.app.locals.db.collection('orders');
  const productsCollection = req.app.locals.db.collection('products');
  const orderedProducts = req.body.products;

  orderedProducts.forEach((orderedProduct) => {

    let id = new ObjectId(orderedProduct.productId);
    let orderedAmount = orderedProduct.quantity;

    productsCollection.findOne({_id: id})
    .then(result => {
     let currentAmount = result.lager;
     
     let newAmount = currentAmount - orderedAmount;

     productsCollection.updateOne({_id: id}, {$set: {"lager": newAmount}});
    });

  });

  ordersCollection.insertOne(req.body)
  .then(result => {
    answer.success = true;
    answer.id = result.insertedId;
    res.json(answer);
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
