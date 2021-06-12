const bcrypt = require('bcrypt');
const User = require('../models/User')

module.exports = (req, res) => {
    var user_id = req.body["user_id"];
    var password = req.body["password"];

    User.findOne({user_id:user_id},(error,user)=>{
        if(user){
            bcrypt.compare(password, user.password, (error, same)=>{
                if(same){
                    req.session.userId = user.username; 
                    req.session.ruserId = user.user_id; 
                    res.redirect('/auth/home')
                }
                else{
                    res.redirect('/')
                }
            })
        }
        else{
            res.redirect('/')
        }
    })
}