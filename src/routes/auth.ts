import { FastifyPluginAsync, FastifyReply } from 'fastify';
import RegistrationService from '../modules/auth/auth.service';
import { RegistrationRequest } from '../types/auth';


const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/auth/registration', async function(request: RegistrationRequest, reply: FastifyReply) {
        return RegistrationService.registration(fastify, request, reply);
    })
}

export default authRoute;