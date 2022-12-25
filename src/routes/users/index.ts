import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { GetUserRequest } from 'src/types/user';
import UserController from '../../modules/users/users.controller';

const usersRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/:userId', UserController.getUserByIdHandler);

    fastify.get('/getList', UserController.getUsersListHandler)
    
}

export default usersRoute;