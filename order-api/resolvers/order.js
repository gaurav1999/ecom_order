import {combineResolvers} from 'graphql-resolvers';

const testOrder = async (parent, data, context) => {
  console.log(parent, data, context);
  return data.data;
};

export default {
  Query: {
    testOrder,
  },
};
