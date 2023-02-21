import { FastifyReply } from 'fastify';
import { getUserProfileById, getUsersList } from './users.repositories';
import { mapUsersList } from './users.mapper';

class UsersService {
	// вообще не нужный запрос, после выпилить, будет заменен на profile
	async getUserById(userId: string, reply: FastifyReply) {
		const user = await getUserProfileById(userId);
		reply.send(user);
	}
	async getUsers(name = '', page = 0, userId: string, reply: FastifyReply) {
		const usersList = await getUsersList(name.toLowerCase(), Number(page), 50, userId);
		const usersWithChats = mapUsersList(userId, usersList);

		reply.send(usersWithChats);
	}
}

export default new UsersService();