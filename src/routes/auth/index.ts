import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import AuthController from '../../modules/auth/auth.controller';
import { LoginRequest, RegistrationRequest } from '../../modules/auth/types';


const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post('/registration', function(req: RegistrationRequest, reply) {
		return AuthController.registrationHandler(fastify, req, reply);
	});
        
	fastify.post('/checkLogin', AuthController.checkLoginHandler);
	fastify.post('/login', function(req: LoginRequest, reply) {
		return AuthController.loginHandler(fastify, req, reply);
	});
	fastify.post('/refresh', async function(request: FastifyRequest, reply) {
		return AuthController.refreshTokenHandler(fastify, request, reply);
	}
	);
};

export default authRoute;