import { join } from 'path';
import fastifyAutoload from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { JWT } from '@fastify/jwt';
import AutorizationHook from './utils/authHook';
import TokenBlackListHook from './utils/tokenBlackListHook';


const app: FastifyPluginAsync<FastifyPluginAsync> = async (
	fastify,
	opts
): Promise<void> => {
	void fastify.register(fastifyAutoload, {
		dir: join(__dirname, 'plugins'),
		options: opts,
	});
	void fastify.register(fastifyAutoload, {
		dir: join(__dirname, 'routes'),
		options: {
			prefix: '/api'
		},
	});

	fastify.addHook('onReady', (done) => TokenBlackListHook(fastify, done))

	fastify.addHook('preValidation', (req, reply, done) => AutorizationHook(fastify, req, reply, done));
};

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: never,
		tokensBlackList: Set<string>,
		jwt: JWT
    }
}


export default app;