import AuthService from '../auth/auth.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { RegistrationRequest } from './types';

class AuthController {
    async registrationHandler(request: RegistrationRequest, 
        reply: FastifyReply) 
    {   
        console.log(request.validationError.validation)
        if (request.validationError) {
            return reply.status(400).send({

            })
        }
        return AuthService.registration(request, reply)
    }
}

export default new AuthController()