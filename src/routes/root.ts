import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post('/',  {
        
	}, function(req, reply) {
		return reply.send('Все ок');
	});
};

export default root;
