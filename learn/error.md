## error handling ##
> express comes with a default error handler, so you don't need to write your own to get start
+ synchronous error
```
app.get('/', function(req, res) {
    throw new Error("BROKEN"); // express will catch this on its own error handler
})
```
+ aynchronous error
```
// error returned from asynchronous function invoked by middleware and route handler, we must pass then to the next() function.
// so express will catch and process them
app.get('/', function(req, res, next) {
    fs.readFile("file-path", function(err, data) {
        if (err) {
            next(err);
        } else {
            res.send(data);
        }
    })
})
// if we don't want to deal data, just care error
// above code can be simplified as follows:
app.get('/', [
    function(req, res, next) {
        fs.readFile("file-path", next);
    },
    function(req, res) {
        res.send("OK");
    }
])
// asynchronous error can be caught only in route or middleware's callback
// blow code the error will be blocked
app.get("/", function(req, res, next) {
    setTimeout(function() {
        try {
            throw new Error("BROKEN");
        } catch (err) {
            next(err);
        }
    }, 100);
})
// how to deal the problem above??
// use promise
app.get('/', function(req, res, next) {
    Promise.resolve().then(function() {
        throw new Error("BROKEN");
    }).catch(next); // Errors will be passed to express
})
```
+ writing error handler
    + // anything was passed to next() function, except 'route', express regards the current request as being an error and will skip any remaining non-error handing routing and middleware functions.
    + // if you have a route handler with multiple callback functions you can use the route parameter to skip to the next(only one? or left??) route handler
```
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'somthing failed!'});
    } else {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {error: err});
}
```