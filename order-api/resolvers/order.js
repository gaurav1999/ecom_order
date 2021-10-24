import { combineResolvers } from 'graphql-resolvers';

const testOrder = async (parent, data, { postgres }) => {
  return data.data;
};

const getOrdersFromDb = async(parent, data, {postgres}) => {
  return await  postgres.order.find();
}


export default {
  Query: {
    testOrder,
    getOrders: getOrdersFromDb,
  },
};
