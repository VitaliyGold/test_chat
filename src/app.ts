import { join } from "path";
import AutoLoad, { AutoloadPluginOption } from "fastify-autoload";
import { FastifyPluginAsync } from "fastify";
import { loadEnv } from "./helpers/helpers";

export type AppOption = {

} & Partial<AutoloadPluginOption>;



type AppConfig = typeof appConfig;

const appConfig = {
    postgreDb: {
        host: loadEnv('POSTGRES_HOST'),
        user: loadEnv('POSTGRES_USER'),
        db_name : loadEnv('POSTGRES_DB'),
        port: loadEnv('POSTGRES_PORT'),
        password:  loadEnv('PORSTGRES_PASSWORD'),
    }
}

const app: FastifyPluginAsync<AppOption> = async (
    fastify,
    opts
): Promise<void> => {

    fastify.decorate('appConfig', appConfig);

    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options: opts,
    })
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options: opts,
    })
}

declare module 'fastify' {
    export interface FastifyInstance {
        appConfig: AppConfig;
    }
}

export default app;
export { app };