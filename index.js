const express = require('express');
const PORT = process.env.PORT || 8000;
const dotenv=require('dotenv')
const connectDB=require('./db/mongoose');
const products=require('./routes/product')
const Error=require('./middlewares/Error')

// Database Connection
require('./db/mongoose')

const app=express();

dotenv.config()

// middlewares
app.use(express.json())
app.use(express.urlencoded());
app.use('/api/v1/products',products)
app.use(Error)


// Runnin the Port
app.listen(PORT,(err)=>{
    if(err){
        console.log(`There is an Error :${err}`)
        return;
    }
    console.log(`The Server is running on Port:${PORT}`);
})

connectDB()