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
                signed: false,
            },
            sign: {
                expiresIn: '10m'
            }
        })
        .register(fastifyCookie, {
            secret: loadEnv('COOKIE_KEY'),
            parseOptions: {
              path: '/',
              secure: true,
              httpOnly: true,
              sameSite: true
            }
            
        })
        .decorate("authenticate", async function(request, reply) {
            try {
              const auth = request.headers.authorization;
              const token = auth.split(' ')[1]
              const { id } = fastify.jwt.verify<{ id: string }>(token)
              request.user_id = id;
            } catch (err) {
              reply.send(err)
            }
        })
})