'use strict';

import { isModuleSpecifier } from "@babel/types";

//A Schema is the collection of all query and mutation rules, aggregated into a rule set.
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation,
});

//The resolvers job is to describe how to fetch or mutate data ... in other words, how to "Resolve" the user's request.
// For example, in a simple query that only supports one field (id), the resolver in this case uses the mongoose findById() method, sending the id argument along. The resolver simply returns the result of that operation
todo: {
  type: TodoType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Todo.findById(args.id);
  },
},

//Fetch One Item, By ID
{
	todo (id:"5d183a0960ef482f24e18860") {
    id,
    text,
    complete
  }
}

//fetch all items
{
	todos {
    id,
    text,
    complete
  }
}

//Fetch all items assigned 
{
	todos(assignee:"John") {
    id,
    text,
    category,
    complete
  }
}

//add a new item
mutation {
  addTodo(
    text:"This is a new thing",
    category:"Home",
    complete:false,
    assignee:"Fred",
    difficulty:1
  ), {
    id,text
  }
}


module.exports = graphql; 
//===========================================

// 'use strict';
// const express = require('express');
// const { buildSchema } = require('graphql');
// const expressGraphQL = require('express-graphql');

// const router = express.Router();

// // In-Memory database (array of objects)
// const people = [
//   { id: 1, firstName: 'Jim', lastName: 'Smith', role: 'Parent' },
//   { id: 2, firstName: 'Sally', lastName: 'Smith', role: 'Parent' },
//   { id: 3, firstName: 'Allison', lastName: 'Smith', role: 'Child' },
//   { id: 4, firstName: 'Timmy', lastName: 'Smith', role: 'Child' },
//   { id: 5, firstName: 'Freckles', lastName: 'Smith', role: 'Pet' },
// ];

// // GraphQL schema
// // Identifying what types of lookups we will allow
// // Person is an object type, People is an array of those
// const inMemorySchema = buildSchema(`
//     type Query {
//         person(id: Int!): Person
//         people(lastName: String, role:String): [Person]
//     },
//     type Person {
//         id: Int
//         firstName: String
//         lastName: String
//         role: String
//     }
// `);

// // Methods to fetch a person or a list of people from that list.
// const getPerson = function(args) {
//   let id = args.id;
//   return people.filter(person => {
//     return person.id == id;
//   })[0];
// };

// const getPeople = function(args) {
//   if (Object.keys(args).length) {
//     return people.filter(person => {
//       return (args.lastName ? args.lastName === person.lastName : true) &&
//         (args.role ? args.role === person.role : true)
//     });
//   } else {
//     return people;
//   }
// };

// // Set the rootValue for our query ... these are things that people can search for
// const inMemoryRoot = {
//   person: getPerson,
//   people: getPeople,
// };

// const graph = expressGraphQL({
//   schema: inMemorySchema,
//   rootValue: inMemoryRoot,
//   graphiql: true,
// });

// router.use('/graphql', graph);

// module.exports = router;