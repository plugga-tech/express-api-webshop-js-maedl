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
  const categoriesCollection = req.app.locals.db.collection('categories');

  console.log(process.env.API_KEY);

  if (req.body.token === process.env.API_KEY) {

    const newCategory = {
      name: req.body.name
    }
  
    categoriesCollection.insertOne(newCategory)
    .then(result => {
      console.log(result)
      res.json(result);
    })
  }
  else {
    res.status(401).json({ message: "Not Authorized" });
  }

})

module.exports = router;
