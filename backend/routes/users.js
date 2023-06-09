const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const crypto = require('crypto-js');

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res) {

  const usersCollection = req.app.locals.db.collection('users');

  usersCollection.find().toArray()
  .then(results => {
    let users = [];

    for (let i = 0; i < results.length; i++) {
      delete results[i].password;
      users.push(results[i]);
    }

    res.json(users);
  })

});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', function(req, res) {

  const usersCollection = req.app.locals.db.collection('users');
  let id = req.body.id;
  let objectId = new ObjectId(id);

  usersCollection.findOne({_id: objectId})
  .then(result => {
    res.json(result);
  })

});

// SKAPA USER
router.post('/add', function(req, res) {

  try {
    let answer = {
      success: false,
     }
   
     let newUser = {
       name: req.body.name,
       email: req.body.email,
      }

      newUser.password = hashPassword(req.body.password)

     console.log(newUser.password);
   
     const usersCollection = req.app.locals.db.collection('users');
   
     usersCollection.insertOne(newUser)
     .then(result => {
       answer.success = true;
       answer.id = result.insertedId;
       answer.name = newUser.name;
       res.json(answer);
     })
   
  }
  catch(err) {
    console.log(err);
  }
  
})

// LOGGA IN USER
router.post('/login', function(req, res) {

  const usersCollection = req.app.locals.db.collection('users');

  const user = {
    email: req.body.email
  }

  user.pw = hashPassword(req.body.password);

  let answer = {
    loggedIn: false,
    user: '',
    id: ''
  }

  usersCollection.find().toArray()
  .then(users => {
    for (let i = 0; i < users.length; i++) {
      if (user.email === users[i].email && user.pw === users[i].password) {
        answer.loggedIn = true;
        answer.id = users[i]._id;
      }
    }

    if (answer.loggedIn) {
      res.json(answer);
    }
    else {
      res.status(401).json(answer);
    }
    
  })
  
})

function hashPassword(password) {
  return crypto.SHA3(password).toString();
}

module.exports = router;
