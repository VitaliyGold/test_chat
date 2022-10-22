import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import fastifyCookie  from '@fastify/cookie';
import { loadEnv } from '../helpers/helpers';

export default fp(async (fastify) => {
    return fastify
        .register(jwt, {
            secret: loadEnv('JWTKEY'),
            cookie: {
                cookieName: 'refreshToken',
                signed: false
            },
            sign: {
                expiresIn: '60000'
              }
        })
        .register(fastifyCookie, {
            secret: loadEnv('COOKIE_KEY'),
        })
        .decorate("authenticate", async function(request, reply) {
            try {
              await request.jwtVerify()
            } catch (err) {
              reply.send(err)
            }
        })
})