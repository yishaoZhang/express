## writing middleware for express ##
```
const express = require('express');
const app = new express();
// normal
const myLogger = function(req, res, next) {
    console.log('LOGGED');
    next();
}
app.use(myLogger);
app.get('/', function(req, res) {
    res.send('hello world!');
})

// add field to req or res
const requestTime = function(req, res, next) {
    req.requestTime = Date.now();
    next();
}
app.use(requestTime);
app.get('/', function(req, res) {
    res.send(`hello world!<br><small>request at: ${req.requestTime}</small>`)
})

// configurable middleware
// file: my-configurable-middleware.js
module.exports = function(options) {
    return function(req, res, next) {
        // implement the middleware function based on the options object
        next();
    }
}
// use configurable middleware as follows:
const cmw = require('./my-configurable-middleware');
app.use(cmw({option1: 1, option2: 2}));
```

## types of milldeware ##
+ Application-level middleware
    + midlleware was used by Express instance, as app
+ Router-level middleware
    + const router = express.Router();
    + router.use(function(req, res, next) {
        console.log('time', Date.now());
        next();
    })
    + router.use('/user/:id', function(req, res, next) {
        console.log(`request url: ${req.originalUrl}`);
        next();
    })
    + router.get('/user/:id', function(req, res, next) {
        if (req.params.id === '0') next('route'); // skip to the next router
        else next();
    }, function() {
        res.render('regular')
    })
+ Error-handing middleware
+ Built-in middleware
+ Third-party middleware
+ NOTE: 
    + next('route') //skip to the next router
    + all express use create middleware chain
        + if the callback exucate next()
        + the middleware will propagate through middleware chain
        + otherwise: callback's no-exist next() will break up the middleware chain