import UsersService from './users.service';
import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify';
import { GetUserByIdRequest, GetUsersList } from './users.types';

class UserController {
    
	getUsersListHandler(request: GetUsersList, reply: FastifyReply) {

		const { userId } = request.user;
		const { name, page } = request.query;

		return UsersService.getUsers(name, page, userId, reply);
	}
	getUserByIdHandler(request: GetUserByIdRequest, reply: FastifyReply) {

		const { userId } = request.query;

		return UsersService.getUserById(userId, reply);
	}

   
}

export default new UserController();