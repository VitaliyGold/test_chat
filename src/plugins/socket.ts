import fp from 'fastify-plugin';
import websocketPlugin from '@fastify/websocket';

export default fp(async (fastify) => {
    return fastify.register(websocketPlugin);
})