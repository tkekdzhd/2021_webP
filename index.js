const express = require('express');
const path = require('path');
const app = express();
const expressSession = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const { ALLOW_CORS_URI, MONGODB_URI, SERVER_PORT } = require('./configs');
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, err => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('success!');
    }
});

const ejs = require('ejs')
app.set('view engine', 'ejs')
app.set('views', 'views/templates/')
app.use(express.static('public'))
app.use(expressSession({
    secret: 'keyboard cat'
}))


const loginController = require('./controllers/login');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginUserController = require('./controllers/loginUser');
const homeController = require('./controllers/home');
const memoController = require('./controllers/memo');
const logoutController = require('./controllers/logout');
const CalendarPost = require('./models/CalendarPost');
const BlogPost = require('./models/BlogPost.js');

app.get('/', loginController);
app.get('/introduction', loginController);
app.get('/auth/signup', newUserController);
app.get('/auth/home', homeController);
// app.get('/auth/memo', memoController);
app.get('/auth/memo', async (req,res)=>{
    if(req.session.userId) {
        var sName = req.session.userId;
        const blogposts = await BlogPost.find({})
        res.render('auth/memo',{
            blogposts, sName: sName
        })
        // res.render('auth/memo', {sName: sName});
        // console.log(sName);
    }

});

app.get('/auth/logout', logoutController);


app.post('/posts/store', async (req,res)=>{
    var sName = req.session.ruserId;
    req.body.user_id = sName;
    const {
        user_id,
        body
    } = req.body;
    await BlogPost.create({user_id,body})
    res.redirect('/auth/memo')
})
app.post('/posts/delete', async (req, res) => {
    console.log(req.body);
    var id = req.body._id
    const blogposts = await BlogPost.findByIdAndDelete(id);
    // res.send(blogposts);
});
app.post('/api/users/signup', storeUserController);
app.post('/users/login', loginUserController);
app.post('/get_ajax_data', async (req, res) => {
    var sName = req.session.ruserId;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    console.log(startDate);
    console.log(endDate);
    var find_query = { 'start': { '$gte': startDate }, 'end': { '$lte': endDate }, 'user_id': sName };
    const calendarposts = await CalendarPost.find(find_query);
    res.send(calendarposts);
});

app.post('/update_ajax_data', async (req, res) => {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var id = req.body.id
    console.log(startDate);
    console.log(endDate);
    const calendarposts = await CalendarPost.findByIdAndUpdate(id,{
        start: startDate,
        end: endDate
    });
    res.send(calendarposts);
});

app.post('/update_ajax_data1', async (req, res) => {
    var allDay = req.body.allDay;
    var title = req.body.title;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var id = req.body.id;
    var type = req.body.type;
    var backgroundColor = req.body.backgroundColor;
    var description = req.body.description;
    console.log(startDate);
    console.log(endDate);
    const calendarposts = await CalendarPost.findByIdAndUpdate(id,{
        allDay: allDay,
        title: title,
        start: startDate,
        end: endDate,
        type: type,
        backgroundColor: backgroundColor,
        description: description
    });
    res.send(calendarposts);
});

app.post('/delete_ajax_data', async (req, res) => {
    var id = req.body.id
    const calendarposts = await CalendarPost.findByIdAndDelete(id);
    res.send(calendarposts);
});

app.post('/users/cal/store', async (req, res) => {
    var sName = req.session.ruserId;
    req.body.user_id = sName;
    await CalendarPost.create(req.body);
    res.redirect('/auth/home');
});


let port = process.env.PORT;
if(port==null || port == ""){
    port=4000;
}
// app.listen(SERVER_PORT, function () {
//     console.log("Server On")
// });

app.listen(port, ()=>{
    console.log('App listening...')
})


