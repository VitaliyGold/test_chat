
import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { RequestWithUserId } from '../types/auth';
import UsersService from '../modules/users/users.service';

const chatsRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/chatsList', 
    {
        onRequest: [fastify.authenticate]
    }, 
    async function(request: RequestWithUserId, reply: FastifyReply) {

        return UsersService.getUserById(fastify, '1241', reply);
    })
    
}

export default chatsRoute;