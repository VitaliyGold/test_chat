import { FastifyRequest } from 'fastify';

interface AuthData {
    login: string,
    password: string,
}
interface RegistrationData extends AuthData{
    name: string,
} 

export interface RegistrationModel extends RegistrationData{
    user_id: string
}


export interface UserModel extends RegistrationModel{
    id: number
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
