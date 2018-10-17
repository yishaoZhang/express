var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const insertDocuments = function(db, callback) {
  // get the documents collection
  const collection = db.collection('documents');
  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log('insert 3 documents into the collection');
    callback(result);
  });
}
const findDocuments = function(db, callback) {
  // get the document collection
  const collection = db.collection('documents');
  // find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('found the following records');
    console.log(docs);
    callback(docs);
  });
}

const updateDocument = function (db, callback) {
  // get the documents collection
  const collection = db.collection('document');
  // update document where a is 2, set b equal to 1
  collection.updateOne({a: 2}, 
    {$set: {b: 1}},
    function(err, result) {
      assert.equal(err, null);
      //assert.equal(1, result.result.n);
      console.log("update the document with the field a eqaul to 2");
      callback(result);
    }
  )
}

const remove = function (db, callback) {
  // get the document collection
  const collection = db.collection('documents');
  collection.deleteOne({a: 3}, function(err, result) {
    assert.equal(err, null);
    //assert.equal(1, result.result.n);
    console.log('removed the document with the field a equal to 3');
    callback(result);
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('zhangyishao')
  res.render('index', { title: 'Express' });
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("connected successfully to server");
    const db = client.db(dbName);
    insertDocuments(db, function() {
      client.close();
    });
  });
})

router.get('/find', function(req, res, next) {
  res.render('find', { title: 'find' });
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("connected successfully to server");
    const db = client.db(dbName);
    findDocuments(db, function() {
      client.close();
    });
  });
})

router.get('/update', function(req, res, next) {
  res.render('update', { title: 'update' });
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("connected successfully to server");
    const db = client.db(dbName);
    updateDocument(db, function() {
      client.close();
    });
  });
})
router.get('/remove', function(req, res, next) {
  res.render('remove', { title: 'remove' });
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("connected successfully to server");
    const db = client.db(dbName);
    remove(db, function() {
      client.close();
    });
  });
})


module.exports = router;
