## JWT(json web token)/跨域认证 ##
+ cookie session一般流程
  + 用户向服务器发送用户名和密码
  + 服务器验证通过后，在当前会话保存相关数据，如角色 登录时间等
  + 服务器向用户返回一个session_id 写入用户 cookie
  + 用户的每一次请求都会通过 cookie将 session_id 传回服务器
  + 服务器通过session_id找到前期在session中保存数据，由此得知用户身份及相关权限
+ 上述存在问题
  + 跨服跨域
    + 现在系统一般多台服务器分布，session服务器共享，存在扩展性瓶颈（scaling）
      + 举例：A 与 B 为关联网站或系统，登录A，访问B自动登录？
  + 一般解决方案
    + sesson数据持久化
      + 写入库或持久层
      + 架构清晰工程量大

## jwt基础 ##
+ 一般原理
  + 将验证数据存至客户端，用户每次请求都发送至服务端
+ 一般功能
  + 加密码：生成jwt
  + 验证/verify：验证该JWT是否合法
  + 解密：将JWT还原为普通JSON字符串
+ 一般数据结构
  + Header
    + 描述JWT元数据
      + alg：签名算法令牌，默认HS256
      + typ：类型，一般为JWT
  + Payload
    + 载体，用来存放实际要传输的JSON数据
  + signature
    + 对前两部分数据进行签名，防止被篡改
  + 最终结果
    + 最终计算：HMACSHA256(base64URLEncode(header) + "." +
      base64URLEncode(payload), secret)
+ 客户端存放位置
  + cookie
    + 不能跨域
  + http 请求头 AutoHorization 里
    + 需发送option请求，验证
  + 请求体
    + 配合https 比较适合当下一般需求

## JWT features ##
+ jwt 默认不加密，也可以加密
  + 秘密数据写入JWT一定要加密
+ jwt 不仅可以用于认证同样也可以用于信息交换
+ 使用JWT 可以有效降低数据库查询次数
+ JWT最大的缺点：一旦JWT签发，在到期这前就会始终有效，除非服务器部署额外逻辑
  + 鉴于此，认证时间结合业务尽可以短
  + 对于特别重要的权限，需二次认证
  + 可结合HTTPs使用
