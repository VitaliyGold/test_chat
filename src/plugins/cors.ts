import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (fastify) => {
	return fastify
		.register(cors, {
			origin: '*',
			credentials: false
		});
        
});