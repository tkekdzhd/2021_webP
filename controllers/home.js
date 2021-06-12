module.exports = (req, res) =>{
    if(req.session.userId) {
        var sName = req.session.userId;
        res.render('auth/home', {sName: sName});
        console.log(sName);
    }
    
}