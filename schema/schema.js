const graphql = require('graphql');
const _ = require('lodash');

// schema -> define object types & relations btwn obj types
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
let books = [
  {
    name: 'My first million',
    genre: 'Reality',
    id: '1',
  },
  {
    name: 'My second million',
    genre: 'Reality',
    id: '2',
  },
  {
    name: 'My third million',
    genre: 'Reality',
    id: '3',
  },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// define rootqueries -> graph(api) entry points
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, //arguments to our query i.e book('123'){name,author}
      resolve(parent, args) {
        // code to get data from db
        // parent -> relationships btwn data
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// query fires off the resolve()
