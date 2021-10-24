import {combineResolvers} from 'graphql-resolvers';

const testOrder = async (parent, data, context) => {
  console.log(context);
  return data.data;
};


export default {
  Query: {
    testOrder,
  },
};
