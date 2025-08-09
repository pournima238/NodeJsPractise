const express=require("express");
const http=require("http");
const app=express();
app.get("/",(req,res)=>{
    return res.send("hello from home page");
});

app.get("/about",(req,res)=>{
    return res.send("hello from about page"+req.query.name+req.query.age);
});

app.listen(8000,()=>{
    console.log("server started on port 8000");
})

// const myServer = http.createServer(app);


// myServer.listen(8000, () => {
//     console.log("server started");
//   });