import { join } from 'path';
import fastifyAutoload from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';


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
		options: opts,
	});

	fastify.addHook('onRequest', async (req, reply) => {
		try {
			const url = req.url.split('/');
			if (url[1] !== 'auth') {
				// @ts-ignore
				const jwtKey = await req.jwtVerify();
				if (jwtKey.name !== 'authToken') {
					return reply.status(401).send({
						message: 'Invalid token',
						status: 401
					});
				}
			}
		} catch(e) {
			reply.code(401).send(e);
		}
	});
};

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: never,
    }
}

export default app;