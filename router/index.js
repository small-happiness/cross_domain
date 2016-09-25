var expresps = require('express');
var router = expresps.Router();

/* 普通文件上传（原始的方式--同步上传，会进行页面的刷新）
var mutipart = require('connect-multiparty');
var mutipartMiddleware = mutipart();*/

router.all('/',function (req,resp) {
    resp.sendFile('../src/index.html');
    // resp.sendFile('../src/fileLoad.html');
    // resp.send('../src/fileLoad.html');
});

/* 普通文件上传--文件按上传的使用方式，以及逻辑处理
router.post('/upload', mutipartMiddleware, function (req, res) {
    console.log(req.files);//取得文件相关信息，此时文件已经上传到服务器保存
    fs.unlink(req.files.myfile.path);//删除临时存放的文件
});*/

//测试iframe跨域实现
router.all('/test', function(req, resp) {
/*
    /!*
     * 如下的设置，根据xhr level2的标准，将对允许跨域的域名设置白名单
     * 默认的情况下，cors方式只允许get方法，而通常put，delete，post都会使用到，所以需要设置的其实有三部分
     * 在设置完成后，前台发起的一次跨域请求会浏览器会解析执行两次，第一次进行验证，是否是跨域白名单内的地址，第二次才是真正的返回数据
     * *!/
    resp.setHeader('Access-Control-Allow-Origin', 'http://a.test.com');
    ////res.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    resp.setHeader('Access-Control-Allow-Headers','test,others,h');//第二个参数用于设置允许的头列表，用逗号隔开
*/

    /*
    * 如下的设置，根据xhr level1的标准进行跨域
    * */
    resp.send('这是b域的返回'+req.query.name);
});

//测试jsonp跨域实现，前台是通过脚本发起的这一请求：
//<script src="http://b.test.com/testjsonp"></script>
router.all('/testjsonp', function(req, resp) {
    //这里返回的其实只是一段文本，因为处于脚本标签内部，所以会被当成脚本执行，这里脚本
    //是callback（{a:1,b:2}）,callback是一个前台页面已经存在的函数名
    resp.setHeader('Content-Type', 'application/javascript');
    resp.send('callback(' + JSON.stringify({a:1, b:2}) + ')');
});

router.all('/testjsonp2', function(req, resp) {
    resp.setHeader('Content-Type', 'application/javascript'); //cb123({a:1,b:2})
    resp.send(req.query.callback + '(' + JSON.stringify({a:1, b:2}) + ')');
});

router.all('/testjsonp3', function(req, resp) {
    resp.setHeader('Content-Type', 'application/javascript');
    resp.send(req.query.cbname + '(' + JSON.stringify({a:1, b:2}) + ')');
});

module.exports = router;