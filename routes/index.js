var router = require('express').Router();
var AV = require('leanengine');

var Courses = AV.Object.extend('Course');

router.get('/', function(req, res, next) {
  var query = new AV.Query(Courses);
  query.descending('createdAt');
  query.find({
    success: function(results) {
      res.render('index', {
        title: '校园教练',
        courses: results
      });
    },
    error: function(err) {
      if (err.code === 101) {
        // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
        // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
        res.render('index', {
          title: '校园教练',
          courses: []
        });
      } else {
        next(err);
      }
    }
  });
});

module.exports = router;