## 新手错误 ##
+ mongodb://localhost:27017
  + 协议写错
+ exports.insertOne = async function(obj, callback=function(){}, url='mongodb://localhost:27017', dbname='myproject'){}
  + 该问题没有解决
    + exports=function(){}
      + 无法引用，表达式的问题？
    + 提醒callback不是函数？如此写法没有问题
    + 上述默认参数的位置存在问题，应该倒写
      + 注意原因