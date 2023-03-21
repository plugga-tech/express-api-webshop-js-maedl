const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {

  req.app.locals.db.collection('products').find().toArray()
  .then(results => {
    console.log(results);
    res.json(results);
  });

});

router.get('/:id', function(req, res) {

  let id = req.params.id;
  let productId = new ObjectId(id);

  req.app.locals.db.collection('products').findOne({_id: productId})
  .then(product => {
    console.log(product);
    res.json(product);
  });

})

module.exports = router;
