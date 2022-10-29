import { FastifyRequest } from 'fastify';
import { UserRegistrationScheme } from './auth.scheme';

export interface CreateUserAuthTable {
    login: string,
    user_id: string,
    password: string
}

export type RegistrationRequest = FastifyRequest<{Body: UserRegistrationScheme}>
