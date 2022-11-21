import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { GetUserRequest } from 'src/types/user';
import UsersService from '../../modules/users/users.service';

const usersRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/:userId', 
    
    async function(request: GetUserRequest, reply: FastifyReply) {
        const { user_id } = request.query;
        return UsersService.getUserById(user_id, reply);
    })
    
}

export default usersRoute;