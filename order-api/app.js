'use-strict';
// TODO: Add logger and config code

const config = require('../properties');
global.Config = config;

import utils from './utils'
import {ApolloServer} from 'apollo-server-express';
const {buildSubgraphSchema} = require('@apollo/subgraph');
// const { ApolloLogPlugin } = require('apollo-log');
import { createDb ,migrate } from 'postgres-migrations';
const express = require('express');
import http from 'http';
import { postgres } from '../properties';

const resolvers = require('./resolvers').default;
const schema = require('./schema').default;

const app = express();
app.use(express.json());
app.use('/v1', require('./rest/v1')); // TODO Implement rest endpoints for intra service


let apolloServer = null;
let postgresClient = null;

const connectToPostgres = async() => {
  await createDb("ecom_order",global.Config.postgres);
  const result = await migrate({
    ...global.Config.postgres,
    defaultDatabase: 'postgres',
    database: 'ecom_order',
  }, 'order-api/migrations')
  if (result && result.length) console.log(result, '✔️ Postgres migration complete');
  postgresClient = await utils.db.posgtres.connect();

}

const startApolloServer = async () => {
  await connectToPostgres();
  apolloServer = new ApolloServer({
    introspection: true,
    schema: buildSubgraphSchema([{typeDefs: schema, resolvers}]),
    context: async({req, connection}) => {
      let returnObj = { postgres: postgresClient };
      if(connection || req) {
        return returnObj;
      }
    }
    // plugins: [ApolloLogPlugin()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({app, path: '/graphql'});
};


const startMainServer = async () => {
  try {
    startApolloServer();
    const httpServer = http.createServer(app);
    const serverApp = httpServer.listen({port: global.Config.appolo_server.port}, () => { });
    serverApp.keepAliveTimeout = 65000;
  } catch (error) {
    console.log(error);
  }
};

startMainServer();