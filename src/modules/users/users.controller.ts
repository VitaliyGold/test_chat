import UsersService from './users.service';
import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify';
import { GetUserByIdRequest, GetUsersList } from './types';

class UserController {
    /*
    async getUsersListHandler(request: GetUsersList, reply: FastifyReply) {

        let { name, page } = request.query;

        if (!page) page = 0;
        if (!name) name = '';

        return UsersService.getUsers(name, page, reply)
    }
    */
    async getUserByIdHandler(request: GetUserByIdRequest, reply: FastifyReply) {
        console.log(request.params)
        const { userId } = request.params;
        console.log(userId)
        return UsersService.getUserById(userId, reply)
    }

   
}

export default new UserController()