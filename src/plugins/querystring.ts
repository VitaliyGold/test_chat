import fp from 'fastify-plugin';
import qs from 'qs';

export default fp(async (fastify) => {
    fastify.decorate('parseQueryString', qs);
    return fastify
        .register(require('fastify-qs'), {})
});