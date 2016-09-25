var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname,"src")));

app.use(function(request, response, next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "test");
    //定义后台允许使用的ajax方法
    response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
});

//路由转向，所有的路径都匹配到新文件中
app.use('/', require('./router/index.js'));

// 启动端口
var DEFAULT_PORT = 8080;
app.listen(DEFAULT_PORT);
console.log('express server is started at port: %d', DEFAULT_PORT);
