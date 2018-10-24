/* var moment = require('moment');
var a = moment().valueOf();
console.log(typeof a)
console.log(moment(1530205037511).format("YYYY-MM-DD")); */
var jwt = require('jsonwebtoken');
jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImQwOTcwNzE0NzU3NzgzZTZjZjE3YjI2ZmI4ZTIyOThmIiwiaWF0IjoxNTQwMjc2NDkxLCJleHAiOjE1NDAyOTQ0OTF9.eznVGhm4jGmkappo-w2P82YHAg6xh2Hpoexsh6ljqlo', 'xuyishao', function(err, decode) {
  if (err) {
    console.log(err);
  }
  console.log(decode);
})