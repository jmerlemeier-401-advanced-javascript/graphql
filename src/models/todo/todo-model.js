'use strict';

const Model = require('../mongo.js');
const schema = require('./todo-schema.js');


/**
 * Class representing a To Do Item.
 * Extends the class from mongo.js so we get all those methods!
 * @extends Model
 */
class Todo extends Model {
  constructor() { super(schema); }
}

module.exports = Todo;