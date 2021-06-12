const User = require('../models/User.js')

module.exports = (req,res)=>{
    const {
        user_id,
        username,
        password,
    } = req.body;

    User.create({user_id,username,password},(error, user)=>{
        if(error){
            return res.redirect('/auth/signup')    
        }
        res.redirect('/')    
    })
}