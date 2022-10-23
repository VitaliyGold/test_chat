import { FastifyRequest } from 'fastify';

export interface AuthData {
    login: string,
    password: string,
}
export interface RegistrationData extends AuthData{
    name: string,
}

export interface RegistrationModel extends RegistrationData {
    user_id: string
}

export interface AuthModel extends AuthData{
    user_id: string
}

export type RegistrationRequest = FastifyRequest<{
    Body: RegistrationData;
}>

export type CheckLoginRequest = FastifyRequest<{
    Body: { 
        login: string,
    };
}>

export type LoginRequest = FastifyRequest<{
    Body: AuthData
}>

export type RefreshTokenRequest = FastifyRequest<{
    Body: {}
}>
