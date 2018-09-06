const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type:string, unique:true,lowercase = true},
    password: string,
    picture:string,
    created:{type:Date,default:Date.now}
});

module.exports = mongoose.model('User',UserSchema);