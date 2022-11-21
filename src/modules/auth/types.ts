import { FastifyRequest, FastifyReply } from 'fastify';
import { UserRegistrationScheme, UserLoginScheme } from './auth.scheme';

export interface CreateUserDto {
    login: string,
    user_id: string,
    password: string,
    name: string
}

export interface LoginDto {
    login: string,
    password: string,
}


export type CheckLoginRequest = FastifyRequest<{Body: { login: string }}>

export type RegistrationRequest = FastifyRequest<{Body: UserRegistrationScheme}>

export type LoginRequest = FastifyRequest<{Body: UserLoginScheme}>
