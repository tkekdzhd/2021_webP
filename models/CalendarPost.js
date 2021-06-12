const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CalendarPostSchema = new Schema({
    title: String,
    description: String,
    start: Date,
    end: Date,
    type: String,
    backgroundColor:String,
    textColor: String,
    allDay: Boolean,
    user_id: String
});

const CalendarPost = mongoose.model('CalendarPost', CalendarPostSchema);
module.exports = CalendarPost;