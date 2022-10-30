import { FastifyPluginAsync } from 'fastify';
import { $ref } from '../modules/auth/auth.scheme';
import AuthController from '../modules/auth/auth.controller';


const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/auth/registration',  {
        schema: {
            body: $ref("registrationScheme"),
            response: {
                201: $ref("registrationResponseScheme"),
            }
        },
        attachValidation: true
    }, function(request: any, response) {
        
        return AuthController.registrationHandler(request, response)
    })
        
    /*
    fastify.post('/auth/checkLogin', async function(request: CheckLoginRequest, reply: FastifyReply) {
        return RegistrationService.checkLogin(fastify, request, reply);
    })
    fastify.post('/auth/login', async function(request: LoginRequest, reply: FastifyReply) {
        return RegistrationService.login(fastify, request, reply);
    })
    fastify.post('/auth/refresh', async function(request: LoginRequest, reply: FastifyReply) {
        return RegistrationService.refresh(fastify, request, reply);
    })
    */
}

export default authRoute;