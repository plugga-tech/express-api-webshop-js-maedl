const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res) {

  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    let users = [];

    for (let i = 0; i < results.length; i++) {
      console.log('before delete', results[i]);
      delete results[i].password;
      console.log(results[i]);
      users.push(results[i]);
    }

    res.send(users);
  })

});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', function(req, res, next) {

  let id = req.body.id;
  let objectId = new ObjectId(id);

  console.log(objectId);

  req.app.locals.db.collection('users').findOne({_id: objectId})
  .then(result => {
    console.log(result);
    res.json(result);
  })

});

// SKAPA USER
router.post('/add', function(req, res) {

  req.app.locals.db.collection('users').insertOne(req.body)
  .then(result => {
    console.log(result.insertedId);
    res.json(result);
  })
})

router.post('/login', function(req, res) {
  let response = req.body;
  res.json(response);
})

module.exports = router;
