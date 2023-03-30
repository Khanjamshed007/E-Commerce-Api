const Error=(req,res)=>{
    res.status(404).send('This page is not availabel')
}

module.exports=Error;