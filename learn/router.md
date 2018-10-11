## route handlers ##
> router 可以有多个callback， 靠next()来传递
```
app.get('/example/b', function(req, res, next) {
    console.log('the response will be sent by the next function...');
    next();
}, function(req, res) {
    res.send('hello from b!')
})
```
```
var cb0 = function(req, res, next) {
    console.log('cb0');
    next();
}
var cb1 = function(req, res, next) {
    console.log('cb1');
    next();
}
app.get('/example/c', [cb0, cb1], function(req, res, next) {
    console.log('the response will be sent by the next function...');
    next();
}, function(req, res) {
    res.send('hello from D!')
})
```

## route res[type] ##
+ res.download()
    + this method use res.sendFile() to transfer the file
```
    res.download('test1.pdf', 'test2.pdf', function(err) {
        if (err) {
            // handle error, but keep in mind the response may be partially-sent
            // so check res.headerSent
        } else {
            // decrement a download credit, etc.
        }
    })
```
+ res.end()
    + res.status(404).end()
+ res.json()
+ res.jsonp()
+ res.redirect()
    + res.redirect([status,] path)
    + res.redirect(301, 'http://baidu.com')
+ res.render(view[, locals][, callback])
    + argument view: string of the view file relative or absolute path
```
    res.render('index')
    // html string be sent explicitly
    res.render('index', function(err, html) {
        res.send(html);
    })
    // pass a local variable to the view
    res.render('user', {name: 'zhang'}, function(err, html) {
        // ...
    })
```
+ res.send([body])
    + Buffer, String, Object, Array
+ res.sendStatus(statusCode)
    + res.sendStatus(500) // equivalent to res.status(500).send('Internal Server Error')
+ res.set(field[, value])
```
    res.set({
        'Content-Type': 'text/plain',
        'Content-Length': '123',
        'ETag': '12345'
    })
```
+ res.sendFile(path[,options][,fn])
    + options arguments:
        + maxAge
        + root
        + lastModified
        + headers
        + dotfiles
        + acceptRanges
        + cacheControl
        + immutable
```
app.get('./file/:name', function(req, res, next) {
    var options = {
        root: __dirname + 'public',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    var fileName = req.params.name;
    res.sendFile(fileName, options, function(err) {
        if (err) {
            return err;
        } else {
            console.log(`sent: ${fileName}`)
        }
    })
})
```

## route parameters ##
+ propose this method
    + Route path: /users/:userId/books/:bookId
    + Request URL: http://localhost:3000/users/zhang/books/100
    + req.params: {"userId": "zhang", "bookId": 100}