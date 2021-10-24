import {gql} from 'apollo-server-express';

export default gql`
    extend type Query {
        testOrder(data:String):String
        getOrders: [Order]
    }

    extend type Mutation{
        testMutation(data:String):String
    }

    type Order{
        created: String
        updated:String
        address_object: Object
    }
`;

