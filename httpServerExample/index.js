const http = require("http");
const fs= require("fs");
const url=require("url");


const myServer = http.createServer((req, res) => {
if(req.url==="/favicon.ico"){
    return res.end();
}
  console.log("req", req.headers);
  const log=`${Date.now()}:${req.url}: ${req.method}new Req recieved\n`;
  const myUrl = url.parse(req.url,true);
  console.log("myUrl",myUrl);
  fs.appendFile('log.txt',log,(err,data)=>{
    // res.end("hello from server again",data);
    switch(myUrl.pathname){
      case "/":
        if(req.method==="GET"){
            res.end("hello from home page");
        }
        break;
      case "/about":
        res.end("hello from about page");
        break;
    case'/signup':
        if(req.method==="GET"){
            res.end("hello from signup page");
        }else if(req.method==="POST"){
            res.end("success");
        }
        break;
      default:
        res.end("404 not found");
    }
  });
//   console.log("new request received");  
//   res.end("hello ending");
});

myServer.listen(8000, () => {
  console.log("server started");
});
