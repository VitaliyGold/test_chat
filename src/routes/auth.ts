import { FastifyPluginAsync } from 'fastify';
import { $ref } from '../modules/auth/auth.scheme';
import AuthController from '../modules/auth/auth.controller';
import { LoginRequest, RegistrationRequest } from 'src/modules/auth/types';


const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/auth/registration',  {
        schema: {
            body: $ref("registrationScheme"),
            response: {
                201: $ref("registrationResponseScheme"),
                400: $ref("responseErrorScheme")
            }
        },
    }, function(req: RegistrationRequest, reply) {
        return AuthController.registrationHandler(fastify, req, reply)
    })
        
    fastify.post('/auth/checkLogin', {
        schema: {
            body: $ref("checkLoginScheme"),
            response: {
                201: $ref("checkLoginResponseScheme"),
                400: $ref("responseErrorScheme")
            }
        },
    }, AuthController.checkLoginHandler)
    fastify.post('/auth/login', {
        schema: {
            body: $ref("loginScheme"),
            response: {
                201: $ref("loginResponseScheme"),
                400: $ref("responseErrorScheme")
            }
        },
    }, function(req: LoginRequest, reply) {
        return AuthController.loginHandler(fastify, req, reply)
    })
    /*
    fastify.post('/auth/refresh', async function(request: LoginRequest, reply: FastifyReply) {
        return RegistrationService.refresh(fastify, request, reply);
    })
    */
}

export default authRoute;