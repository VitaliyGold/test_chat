import * as dotenv from 'dotenv';
dotenv.config();
const querystring = require('querystring')

import Fastify from 'fastify';
import app from './app';

const server = Fastify({ 
    logger: false,
    querystringParser: str => querystring.parse(str.toLowerCase()),
})

server
  .register(app)
  .then(() => server.ready())
  .then(() => server.listen({ port: 5000 }, (err) => {
    if (err) throw err;
  }))

