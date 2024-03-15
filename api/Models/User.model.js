const mongoose = require('mongoose');

const {Schema , model} = mongoose;


const UserSchema = new Schema({

 username:{ type:String, required : true , unique:true , min:4},
 password:{ type:String, required : true},



});

module.exports = model('User' , UserSchema);

