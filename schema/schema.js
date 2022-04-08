const graphql = require('graphql');

// schema -> define object types & relations btwn obj types
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

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
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
