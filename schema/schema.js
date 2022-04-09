const graphql = require('graphql');
const _ = require('lodash');

// schema -> define object types & relations btwn obj types
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

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

let authors = [
  {
    name: 'Eugene',
    age: '25',
    id: '1',
  },
  {
    name: 'Obare',
    age: '50',
    id: '2',
  },
  {
    name: 'Sambu',
    age: '75',
    id: '3',
  },
];
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return _.find(authors, { id: parent.id });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return _.find(books, { id: parent.id });
      },
    },
  }),
});

// define rootqueries -> graph(api) entry points
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, //arguments to our query i.e book('123'){name,author}
      resolve(parent, args) {
        // code to get data from db
        // parent -> relationships btwn data
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// query fires off the resolve()
