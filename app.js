var express = require('express');
//express 관련된 파일을 가져오는 것임
var app = express();
var bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors());
//CORS 에러를 막기위한 방안

app.listen(3000, function () {
    console.log(`start!! express server on port 3000`);
    //3000 port에서 서버가 시작 되었다.
});

app.use(express.static(`public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view_engine', 'ejs');
//view_engine은 ejs를 쓸래! 선언

//url routing
app.get('/', function (req, res) {
    //http 메소드 중 get을 써서 req res 인자가 있는 콜백 함수 만듬
    res.sendFile(__dirname + `/public/main.html`);
});

app.post('/email_post', function (req, res) {
    //get : req.param('email'); <-get method의 경우 응답 받는 법
    //console.log(req.body.email);
    //res.send(`<h1>Welcome ! ${req.body.email}</h1>`);
    res.render('email.ejs', { 'email': req.body.email })
});

app.post('/ajax_send_email', function (req, res) {
    console.log(req.body.email);
    var responseData = { 'result': 'ok', 'email': req.body.email };
    res.json(responseData);
});