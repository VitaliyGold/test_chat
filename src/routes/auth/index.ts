import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import AuthController from '../../modules/auth/auth.controller';
import { LoginRequest, RegistrationRequest, RequestWithAuth } from '../../modules/auth/types';


const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post('/registration', function(req: RegistrationRequest, reply) {
		return AuthController.RegistrationHandler(fastify, req, reply);
	});
        
	fastify.post('/checkLogin', AuthController.CheckLoginHandler);
	fastify.post('/login', function(req: LoginRequest, reply) {
		return AuthController.LoginHandler(fastify, req, reply);
	});
	fastify.post('/refresh', function(request: RequestWithAuth, reply) {
		return AuthController.RefreshTokenHandler(fastify, request, reply);
	});
	fastify.post('/logout', function(request: RequestWithAuth, reply) {
		return AuthController.LogoutHandler(fastify, request, reply);
	});
};

export default authRoute;