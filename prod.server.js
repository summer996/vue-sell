const express = require('express');
const  config = require('./config/index');

const port = process.env.PORT || config.build.port;

const app = express();

const router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json'); // 加载本地数据文件
var seller = appData.seller; // 获取对应的本地数据
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoutes = express.Router();

app.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })// 接口返回json数据，上面配置的数据seller就赋值给data请求后调用
});
app.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
});
app.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening at http://localhost:9000');
});
