const express = require('express');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({path:'./config/config.env'});

const app = express();

app.get('/',(req,res)=>{
    res.status(200).json({success:true,data:{id:1}});

});

const PORT=process.env.PORT || 3000;
app.listen(PORT, console.log('server running in',process.env.NODE_ENV,'mode on port',PORT));