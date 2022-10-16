import * as dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import app from './app';

const server = Fastify({ 
    
})


server
  .register(app)
  .then(() => server.ready())
  .then(() => server.listen({ port: 5000 }, (err) => {
    if (err) throw err;
  }))
