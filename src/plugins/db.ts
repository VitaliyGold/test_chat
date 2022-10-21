import fp from 'fastify-plugin';
import pg from '@fastify/postgres';

export default fp(async (fastify) => {
    const connectionString = `postgres://${fastify.appConfig.postgreDb.user}:${fastify.appConfig.postgreDb.password}@${fastify.appConfig.postgreDb.host}:${fastify.appConfig.postgreDb.port}/${fastify.appConfig.postgreDb.db_name}`
    fastify.decorate('pg', pg);
    return fastify
        .register(pg, {
            connectionString: connectionString
        })
});