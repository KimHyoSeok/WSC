
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,	io = require('socket.io')
  , database=require('./routes/database')
  , mysql=require('mysql')
  , fs=require("fs");

var PORT=process.env.PORT||80,
HOST=process.env.HOST||'192.168.25.132';

//connection pool
var pool=mysql.createPool({
	"host":"localhost",
	"port":3306,
	"user":"ssss",
	"password":"1234",
	"database":"jschema"
});

//connection변수 global 처리
global.pool=pool;
global.fs=fs;

var app=express();

app.engine('.ejs', require('ejs').__express);
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

if('development'===app.get('env')){
	app.use(express.errorHandler());
}

var server=http.createServer(app);
var io=io.listen(server);


io.on('connection',database.connection);

server.listen(PORT,HOST,null,function(){
	console.log('Server listening on port %d in %s mode',this.address().port,app.settings.env);
});
