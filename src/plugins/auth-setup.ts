import fp from 'fastify-plugin';
import cookie from '@fastify/cookie';
import session from '@fastify/session';

export default fp(async (fastify) => {
    return fastify
        //.register(cookie)
        //.register(session) 
});