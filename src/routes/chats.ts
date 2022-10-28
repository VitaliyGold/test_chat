
import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { RegistrationRequest } from '../modules/auth/types';
import UsersService from '../modules/users/users.service';

const chatsRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/chatsList', 
    {
        onRequest: [fastify.authenticate]
    }, 
    async function(request: RegistrationRequest, reply: FastifyReply) {

        const user_id = '12412'

        return UsersService.getUserById(fastify, user_id, reply);
    })
    
}

export default chatsRoute;