const mongoose=require('mongoose');
const connectionDB=()=>{
    mongoose.connect('mongodb://localhost/E-Commerce-API').then(data=>{
        if(data){
            console.log('Successfully connected to database')
        }
    }).catch(err=>{
        if(err){
            console.log(`There was an error in connecting to database : ${err}`)
        }
    })
}
module.exports=connectionDB