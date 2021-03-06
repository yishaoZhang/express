var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var resData = require('../../config/res');
var jwtCheck = require('../../config/jwtCheck');
const crypto = require('crypto')
const userConfigFun = require('./user');
// 字段是否可以自定义？？？
const moment = require('moment');

// 登录
router.post('/login', function(req, res) {
  userConfigFun.isUserRegister({'username': req.body.name}, {'password': 1}, function(re) {
    const md5 = crypto.createHash('md5');
    // 成功
    if (re && re.length && md5.update(req.body.password).digest("hex") === re[0].password) {
      token = jwt.sign({name: req.body.name, password: re[0].password}, 'xuyishao', {expiresIn: "5h"})
      res.send(Object.assign(resData.succ(), {token: token}));
    } else {
      res.send(Object.assign(resData.succ(), {code: 4010, message: '账号或密码错误'}));
    }
  })
})

router.post('/add', function(req, res) {
  let temD = {10: '管理员', 20: '普通用户', 30: '访客'};
  let checkRe = jwtCheck(req.body.token);
  if (checkRe.code) { // 验证不成功
    res.send(Object.assign(resData.succ(), checkRe));
  } else {
    userConfigFun.isUserRegister({'username': req.body.name}, {'password': 1}, function(re) {
      if (!re || (re && !re.length)) { // 用户未注册
        let insertData = {};
        insertData.level = req.body.roleId;
        insertData.username = req.body.name;
        insertData.origin = '管理员添加';
        insertData.levelName = temD[req.body.roleId];
        insertData.time = moment().valueOf();
        const md5 = crypto.createHash('md5');
        insertData.password = md5.update('000000').digest("hex");
        userConfigFun.register(insertData, function() {
          res.send(Object.assign(
            resData.succ(), 
            {message: '添加成功'}
          ));
        })
      } else {
        res.send(Object.assign(
          resData.succ(), 
          {message: '该用户名被占用'}
        ));
      }
    });
  }
})
// register
router.post('/register', function(req, res) {
  userConfigFun.isUserRegister({'username': req.body.name}, {'password': 1}, function(re) {
    if (!re || (re && !re.length)) { // 用户未注册 此时re 值为 null
      const md5 = crypto.createHash('md5');
      let passW = md5.update(req.body.password).digest("hex");
      let registorData = {'username': req.body.name, 'password': passW};
      if (!req.body.level) {
        registorData.level = 30;
        registorData.levelName = "访客";
      }
      registorData.time = moment().valueOf();
      registorData.origin = '注册';
      userConfigFun.register(registorData, function() {
        token = jwt.sign({name: req.body.name, password: passW}, 'xuyishao', {expiresIn: "5h"})
        res.send(Object.assign(
          resData.succ(), 
          {token: token, message: '注册成功'}
        ));
      });
    }
    if (re && re.length) {
      res.send(Object.assign(
        resData.succ(), 
        {message: '该用户名已被占用', code: 4011}
      ));
    }
  })
})

// get  user's list
router.post('/getUserList', function(req, res) {
  let listParams = {};
  Object.keys(req.body).forEach(key => {
    switch (key) {
      case 'name':
        listParams.username = req.body[key]
        break
      default:
    }
  });
  userConfigFun.getUsersList(listParams, { }, function(re) {
    let checkRe = jwtCheck(req.body.token);
    console.log(checkRe, 'check')
    if (checkRe.code === 401) { // 失效
      res.send(Object.assign(resData.succ(), checkRe));
    } else {
      let reDeal = re.map(item => {
        let re = {}
        re.level = item.level;
        re.levelName = item.levelName;
        re.origin = item.origin;
        re.username = item.username;
        re._id = item._id;
        re.time = moment(item.time).format("YYYY-MM-DD");
        return re;
      })
      res.send(Object.assign(resData.succ(), {data: reDeal}));
    }
  })
})

// 删除
// delUser
router.post('/delUser', function(req, res) {
  let checkRe = jwtCheck(req.body.token);
  if (!checkRe.code) {
    userConfigFun.delUser({username: req.body.username}, function(re) {
      console.log(re, 're')
      res.send(Object.assign(resData.succ(), {message: '删除成功'}));
    })
  } else {
    res.send(Object.assign(resData.succ(), checkRe));
  }
})

module.exports = router;