## error ##
+ Cannot set headers after they are sent to the client
  + 中间件 middlerware next 可以中断中间件执行
  + 但不能打断路由解析
+ 暂解决方案，jwt 验证放在每个路由的 callback中

## package.json ##
+ 主要作用，向后兼容 保证当前项目依赖版本稳定性
  + 若无该文件，依赖采用最新发布
+ 文档提示，package-lock.json 将在安装时自动更新
  + 通过cnpm安装，无法更新package-lock.json
    + 理由，模块存在跌代过程，即持续修改bug过程
    + 如果将版本锁住，bug亦被锁住
    + 稍有抬杠，可以做为面试题，不关注答题，关注抬扛？？？

## crypto ##
+ 报错  Digest already called
  + 一个md5 被多次 digest
  + 实例不可共享，即每次使用每次产生实例
    + const md5 = crypto.createHash('md5');