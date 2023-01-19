import { FastifyReply } from 'fastify';
import { getUserProfileById, getUsersList } from './users.repositories';
import { UsersList } from './users.types';

class UsersService {
	async getUserById(id: string, reply: FastifyReply) {
		const user = await getUserProfileById(id);
		reply.send(user);
	}
	async getUsers(name = '', page = 0, userId, reply: FastifyReply) {
		const usersList = await getUsersList(name.toLowerCase(), Number(page), 50, userId);
		const usersWithChats = [];
		// помечаем есть ли у текущего пользователя чат с данным пользователем
		for (const user of usersList) {

			if (user.userId === userId) {
				continue;
			}

			const chatId = user.chatsMembersList.length ? user.chatsMembersList[0].chatId : null;

			usersWithChats.push({
				userId: user.userId,
				name: user.name,
				haveChat: !!user.chatsMembersList.length,
				chatId 
			});
		}

		reply.send(usersWithChats);
	}
}

export default new UsersService();