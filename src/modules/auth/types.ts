import { FastifyRequest } from 'fastify';
import { UserRegistrationScheme } from './auth.scheme';

export interface RegistrationData {
    login: string,
    user_id: string,
    name: string,
    password: string
}

export type RegistrationRequest = FastifyRequest<{Body: UserRegistrationScheme}>
