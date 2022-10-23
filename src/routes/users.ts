import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { GetUserRequest } from 'src/types/user';
import UsersService from '../modules/users/users.service';

const usersRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/users/:userId', 
    {
        onRequest: [fastify.authenticate]
    }, 
    async function(request: GetUserRequest, reply: FastifyReply) {
        const { user_id } = request.params
        return UsersService.getUserById(fastify, user_id, reply);
    })
    
}

export default usersRoute;