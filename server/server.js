var express    =    require('express'),
	bodyParser = require('body-parser');
var app        =    express();


app.use('/', express.static(__dirname + '/../www'));
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

require('./router/main')(app);

var server     =    app.listen(8282,function(){
    console.log("We have started our server on port 8282");
});