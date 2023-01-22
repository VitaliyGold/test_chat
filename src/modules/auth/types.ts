import { FastifyRequest } from 'fastify';

export interface CreateUserDto {
    login: string,
    userId: string,
    password: string,
    name: string,
    userLink: string,
    avatarLink: string
}

export interface LoginDto {
    login: string,
    password: string,
}

export interface UserRegistrationRequest {
    login: string,
    password: string,
    name: string
}

export interface UserLoginRequest {
    login: string,
    password: string
}


export type CheckLoginRequest = FastifyRequest<{Body: { login: string }}>

export type RegistrationRequest = FastifyRequest<{Body: UserRegistrationRequest}>

export type LoginRequest = FastifyRequest<{Body: UserLoginRequest}>


export type RefreshRequest = FastifyRequest & AuthRequestParams

export type AuthRequestParams = { user: { userId: string } }