'use strict';

const mongoose = require('mongoose');
//instantiate-schema-jsonschema')(mongoose);

//create mongoose model
const todo = mongoose.Schema({
  text: { type:String, required:true },
  category: {type: String},
  assignee: { type:String, required:true },
  difficulty: {type:Number, required:true, default: 3},
  complete: {type:Boolean, required:true, default:false},
});

module.exports = mongoose.model('todo', todo);