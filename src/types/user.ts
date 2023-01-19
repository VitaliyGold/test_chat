import { FastifyRequest } from 'fastify';

export interface User {
    name: string,
    login: string,
}

export type GetUserRequest = FastifyRequest<{
    Querystring: {
        userId: string
    }
}>