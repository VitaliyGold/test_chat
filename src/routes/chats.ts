
import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { RequestWithUserId } from '../types/auth';
import UsersService from '../modules/users/users.service';

const chatsRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/chatsList', 
    {
        onRequest: [fastify.authenticate]
    }, 
    async function(request: RequestWithUserId, reply: FastifyReply) {

        const user_id = request.user_id

        return UsersService.getUserById(fastify, user_id, reply);
    })
    
}

export default chatsRoute;