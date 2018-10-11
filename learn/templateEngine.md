## template engine ##
+ support ejs handlebar pug jade, etc.
    + default: pug
+ command for create Express application
    + express [option] [dir]
        + express --view=pug myexpress

## view engine setup ##
+ three points
    + set views' path
        + app = new express()
        + app.set('views', path.join(__dirname, 'views'))
    + set views' engine
        + app.set('view engine', 'pug')
    + use the engine but change extension
        + as .html replace pug
            + app.engine('.html', require('pug').__express)
            + app.set('view engine', 'html')