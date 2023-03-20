const express = require('express');
const router = express.Router();

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res, next) {
  res.send('root');
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', function(req, res, next) {
  let response = req.body;
  res.json(response);
});

// SKAPA USER
router.post('/add', function(req, res) {
  res.send('add')
})

router.post('/login', function(req, res) {
  let response = req.body;
  res.json(response);
})

module.exports = router;
