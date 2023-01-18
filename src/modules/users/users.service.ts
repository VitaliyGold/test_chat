import { FastifyReply } from 'fastify';
import { getUserProfileById, getUsersList } from './users.repositories';
import { UsersList } from './users.types';

class UsersService {
	async getUserById(id: string, reply: FastifyReply) {
		const user = await getUserProfileById(id);
		reply.send(user);
	}
	async getUsers(name = '', page = 0, user_id: string, reply: FastifyReply) {
		const users_list = await getUsersList(name.toLowerCase(), Number(page), 50, user_id);
		const users_with_chats: UsersList = [];
		// помечаем есть ли у текущего пользователя чат с данным пользователем
		for (const user of users_list) {

			if (user.user_id === user_id) {
				continue;
			}

			const chat_id = user.chats_members_list.length ? user.chats_members_list[0].chat_id : null;

			users_with_chats.push({
				user_id: user.user_id,
				name: user.name,
				have_chat: !!user.chats_members_list.length,
				chat_id 
			});
		}

		reply.send(users_with_chats);
	}
}

export default new UsersService();