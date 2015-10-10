var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require("cookie-parser");

var Router = require("cloud/connect/router.js");
var ProtoData = require("cloud/protocol/protoData.js");

var app = express();

// App 全局配置
app.set('views', '/views');   // 设置模板目录
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.use(express.static(path.join(__dirname, '/public')));

// 设置 Cookie
//app.use(cookieParser());
/*在此监听request的data、end事件可拿到请求的原始数据*/
app.use(bodyParser.urlencoded({extended: true}));    // 读取请求 body 的中间件
app.use(bodyParser.json());

app.use("/entry", Router);
app.get("/testapi", function (req, res) {
	res.render("index", {get: ProtoData.ProtoGet, post: ProtoData.ProtoPost});
});
app.post("/createFile", function (req, res) {
	var params = req.body;
	require("cloud/common/createFile.js")(params, res);
});

app.listen();