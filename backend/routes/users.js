const express = require('express');
const router = express.Router();

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res, next) {

  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    console.log(results);
    res.send(results);
  })

});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', function(req, res, next) {
  let response = req.body;
  res.json(response);
});

// SKAPA USER
router.post('/add', function(req, res) {

  req.app.locals.db.collection('users').insertOne(req.body)
  .then(result => {
    console.log(result);
    res.redirect('/');
  })
})

router.post('/login', function(req, res) {
  let response = req.body;
  res.json(response);
})

module.exports = router;
