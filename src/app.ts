import { join } from "path";
import fastifyAutoload from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";


// это уже не нужно, но удалять рано
/*
const appConfig = {
    postgreDb: {
        host: loadEnv('POSTGRES_HOST'),
        user: loadEnv('POSTGRES_USER'),
        db_name : loadEnv('POSTGRES_DB'),
        port: loadEnv('POSTGRES_PORT'),
        password:  loadEnv('PORSTGRES_PASSWORD'),
    },
}
type AppConfig = typeof appConfig;

type AppOption = FastifyPluginAsync & AppConfig
*/

const app: FastifyPluginAsync<FastifyPluginAsync> = async (
    fastify,
    opts
): Promise<void> => {

    void fastify.register(fastifyAutoload, {
        dir: join(__dirname, 'plugins'),
        options: opts,
    })
    void fastify.register(fastifyAutoload, {
        dir: join(__dirname, 'routes'),
        options: opts,
    })
}

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: never,
    }
}

export default app;