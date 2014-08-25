var express = require("express");
var server = express();
var port = Number(process.env.PORT || 3000)
server.use(express.static(__dirname));
server.listen(port,function(){
   //console.log("Server started on 127.0.0.1:" + port);
});

