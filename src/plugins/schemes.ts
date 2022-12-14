import fp from 'fastify-plugin';
import { getSchemesCollections } from '../utils/schemes.collections';

export default fp(async (fastify) => {
    for (let schemes of getSchemesCollections()) {
        fastify.addSchema(schemes)
    }
    return fastify
})