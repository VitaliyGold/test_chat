import AuthService from '../auth/auth.service';
import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify';
import { RegistrationRequest, CheckLoginRequest, LoginRequest } from './types';

class AuthController {
    async registrationHandler(fastify: FastifyInstance, request: RegistrationRequest, reply: FastifyReply) {
        return AuthService.registration(fastify, request, reply)
    }

    async loginHandler(fastify: FastifyInstance, request: LoginRequest, reply: FastifyReply) {
        return AuthService.login(fastify, request, reply)
    }

    async checkLoginHandler(request: CheckLoginRequest, reply: FastifyReply) {
        return AuthService.checkLogin(request, reply)
    }
    async refreshTokenHandler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
        return AuthService.refresh(fastify, request, reply)
    }
}

export default new AuthController()