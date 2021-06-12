module.exports = (req, res) =>{
    if(req.session.userId) {
        var sName = req.session.userId;
        res.render('auth/memo', {sName: sName});
        console.log(sName);
    }
}