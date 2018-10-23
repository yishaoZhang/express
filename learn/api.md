## 接口及跨域 ##
+ token 放请求体方案
+ 路由级别中间件处理
  + app.use('/api/*', apiMiddleware);
  + apiMiddleware
    + function(req, res, next) {
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/html'
        });
        next();
      }
+ req.method 无法判断
  + 普通网页请求亦为：GET