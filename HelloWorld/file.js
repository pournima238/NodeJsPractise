const fs=require("fs");

//create file
// fs.writeFileSync('./test.text',"hey there");
// fs.writeFile('.test2.text',"hey thereeeee", (err)=>{});
const result=fs.readFileSync("./contacts.txt","utf-8");
console.log("result",result);
fs.readFile("./contacts.txt","utf-8",(err,data)=>{
    if(err){
        console.log("error",err);}
        console.log("ress",data);
});