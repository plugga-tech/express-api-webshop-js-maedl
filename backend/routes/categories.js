const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const categoriesCollection = req.app.locals.db.collection('categories');

  categoriesCollection.find().toArray()
  .then(results => {
    res.json(results);
  });
});

router.post('/add', function(req, res) {
  console.log(req.body);
})

module.exports = router;
