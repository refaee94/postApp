const mongoose = require("mongoose");
const unique = require('mongoose-unique-validator');

const Schema = mongoose.Schema({
email:{type:String,required:true,unique:true},
password:{type:String,required:true}

});

Schema.plugin(unique);
module.exports= mongoose.model('User',Schema);

