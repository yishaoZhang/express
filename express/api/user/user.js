const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'admin';

// 链接数据库，可以封装

const findDocuments = function(db, data, filter, callback) {
  // get the document collection
  const collection = db.collection('users');
  // find some documents
  // find 内部是否可以直接加回调？？？
  collection
    // filter 未成作用？？？？
    .find(data, filter)
    .toArray((err, doc) => {
      if (err) {
         console.log(err, 'findDocuments')
      }
      callback(doc);
    })
}

const insertDocument = function(db, data, callback) {
  const collection = db.collection('users');
  collection.insertOne(data, function(err, result) {
    callback();
  })
}

/* 
  @ data: which to find
*/
function isUserRegister(data, filter={}, callback) {
  MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
    if (err) {
      console.log(err, '1')
    }
    const db = client.db(dbName);
    findDocuments(db, data, filter, function(re) {
      client.close();
      callback(re);
    })
  });
}

/* 
  @ data:which to insert
*/
async function register(data, callback) {
  await MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log(err, '2');
      return;
    }
    const db = client.db(dbName);
    insertDocument(db, data, function() {
      client.close();
    });
  });
  await callback();
}

/* 
  @ data:whick to find
*/
const findUsers = function(db, data, filter, callback) {
  const collection = db.collection('users');
  collection
    .find(data, filter)
    .toArray((err, doc) => {
      if (err) {
         console.log(err, 'findUsers')
      }
      callback(doc);
    })
}
function getUsersList(data, filter={}, callback) {
  MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
    if (err) {
      console.log(err, '1')
    }
    const db = client.db(dbName);
    findUsers(db, data, filter, function(re) {
      client.close();
      callback(re);
    })
  });
}

const removeDocument = function(db, data, callback) {
  const collection = db.collection('users');
  collection.deleteOne(data, function(err, result) {
    if (err) {
      console.log(err, '111')
      return;
    }
    callback(result);
  })
}

function delUser(data, callback) {
  console.log(data)
  MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
    if (err) {
      console.log(err, '6')
    }
    const db = client.db(dbName);
    removeDocument(db, data, function(re) {
      client.close();
      callback(re);
    })
  });
}

module.exports = {
  isUserRegister: isUserRegister,
  register: register,
  getUsersList: getUsersList,
  delUser: delUser
}