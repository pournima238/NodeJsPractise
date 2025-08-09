const express=require('express');
const app=express();
const fs=require('fs');
const users=require('./MOCK_DATA.json');
const port=8000;

app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    //  res.json({msg:"Hello from middleware 1"});
    console.log("Middleware 1");
    next();
});

app.use((req,res,next)=>{
    //  res.json({msg:"Hello from middleware 1"});
    console.log("Middleware 2");
    next();
})



//server side rendering
app.get('/users',(req,res)=>{
    const html=
    `<ul>
    ${users.map(user=>`<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>`;
    return res.send(html);
});


app.get('/api/users',(req,res)=>{
    res.setHeader('myName','pour');
    console.log("req headers",req.headers);
    return res.json(users);
});

// app.get('/api/users/:id',(req,res)=>{
// const id=Number(req.params.id);
// console.log(id);
// const user=users.find(user=>user.id==id);
// res.json(user);
// });

// app.post('/api/users',(req,res)=>{
//     return res.json({status:"pending"});
// })

// app.patch('/api/users/:id',(req,res)=>{
//     return res.json({status:"pending"});
// });

// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status:"pending"});
// })

app.route("/api/users/:id").get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id==id);
    res.json(user)
}).patch((req,res)=>{
    return res.json({status:"pending"});
})
.post((req,res)=>{
    const body=req.body
    console.log("body",body);
    if(!body ||!body.first_name || !body.last_name){
        return res.status(400).json({status:"error",message:"Invalid data"});
    }
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        return res.json({status:"success",message:"User added successfully",id:users.length+1});
    });
})
.delete((req,res)=>{
    return res.json({status:"pending"});
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
