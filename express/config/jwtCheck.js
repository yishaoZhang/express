const jwt = require('jsonwebtoken');
module.exports = function(token) {
  let re = {};
  jwt.verify(token, 'xuyishao', function(err, decoded) {
    if (err) {
      re = {
        code: 401,
        message: 'authorize failed'
      }
    }
  });
  return re;
}