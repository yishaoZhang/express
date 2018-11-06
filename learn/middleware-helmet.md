## frameguard ##
> 能过http头 属性X-Frame-Options,配制该页面是否允许被当做子页面iframe嵌入
+ DENY  
  + 页面不能被嵌入到任何iframe 或 frame中
+ SAMEORIGIN
  + 页面只能被本站页面嵌入到 iframe 或 frame中
+ ALLOW-FROM
  + 页面允许iframe 或 frame加载
```
// 一般用法如下
const helmet = require('helmet')
app.use(helmet.frameguard({action:"sameorigin"}))
```

## https://www.npmjs.com/package/helmet ##
> 时间原因未能补充完，参考上述配制完，并做相应测试