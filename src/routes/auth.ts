import { FastifyPluginAsync, FastifyReply } from 'fastify';
import RegistrationService from '../modules/auth/auth.service';
import { RegistrationRequest, CheckLoginRequest, LoginRequest } from '../types/auth';


const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/auth/registration', async function(request: RegistrationRequest, reply: FastifyReply) {
        return RegistrationService.registration(fastify, request, reply);
    })
    fastify.post('/auth/checkLogin', async function(request: CheckLoginRequest, reply: FastifyReply) {
        return RegistrationService.checkLogin(fastify, request, reply);
    })
    fastify.post('/auth/login', async function(request: LoginRequest, reply: FastifyReply) {
        return RegistrationService.login(fastify, request, reply);
    })
}

export default authRoute;