'use strict';

//provide another method for reaching out to our server. 
//Step 1 define our SCHEMA --> queries,  data types, resolvers

const Todos = require('./models/todo/todo-model.js');
const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql');
const todoModel = new Todos();

//Step 2 make graphql query
// Schema is the collection of all query and mutation rules, aggregated into a rule set.

const todoSchema = buildSchema(`
  type Todo {
    id: ID!
    text: Sting!
    category: String
    assignee: String!
    difficulty: Int!
    complete: Boolean!
  }
  type Query {
    todo(id: ID!): Todo
    todos: [Todos]
  }
  type Mutation { 
    createTodo(text: String!, category: String, complete: Boolean, assignee: String!, difficulty: Int): Todo
  }
`);

//Step 3 - define all resolvers (what functions we want to run when queries are given to us)
const rootReducers = {
  todos: (args) => {
    todoModel.get()
      .then( data => {
        const output = {
          count: data.length,
          results: data,
        };
        return output;
      })
      .catch((e) => {
        console.error(e);
      });
  },
  todo: (args) => {
    todoModel.get(args.id)
      .then( result => result[0])
      .catch((e) => {
        console.error(e);
      });
  },
  createTodo: (args) => {
    todoModel.create(args)
      .then( result => result)
      .catch((e) => {
        console.error(e);
      });
  },
};

module.exports = expressGraphql({
  schema: todoSchema,
  rootValue: rootReducers,
  graphiql: true,
}); 
