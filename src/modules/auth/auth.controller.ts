import AuthService from '../auth/auth.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { RegistrationRequest } from './types';

class AuthController {
    async registrationHandler(request: RegistrationRequest, 
        reply: FastifyReply) 
    {   
        return AuthService.registration(request, reply)
    }
}

export default new AuthController()