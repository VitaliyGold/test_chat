import AuthService from '../auth/auth.service';
import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify';
import { RegistrationRequest, CheckLoginRequest, LoginRequest, RefreshRequest } from './types';

class AuthController {
	async RegistrationHandler(fastify: FastifyInstance, request: RegistrationRequest, reply: FastifyReply) {
		return AuthService.registration(fastify, request, reply);
	}

	async LoginHandler(fastify: FastifyInstance, request: LoginRequest, reply: FastifyReply) {
		return AuthService.login(fastify, request, reply);
	}

	async CheckLoginHandler(request: CheckLoginRequest, reply: FastifyReply) {
		return AuthService.checkLogin(request, reply);
	}
	async RefreshTokenHandler(fastify: FastifyInstance, request: RefreshRequest, reply: FastifyReply) {
		return AuthService.refresh(fastify, request, reply);
	}
}

export default new AuthController();