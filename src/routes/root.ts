import { FastifyPluginAsync } from 'fastify';
import SocketController from '../modules/sockets/sockets.controller';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get('/ws',  { websocket: true }, SocketController.socketRouteHandler);
};

export default root;
