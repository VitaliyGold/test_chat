import { FastifyReply } from 'fastify';
import { CreateChatInfoDto, CreateChatDto } from './chats.types';
import { createNewChat, getChatListForUserId, getChatForMemberIds, getChatForId } from './chats.repositories';
import { randomUUID } from 'crypto';
import { getNewChatFrontDto } from './chats.adapters';
class ChatsService {
	async getChatListForUserId(user_id: string, reply: FastifyReply) {
		const chats_list = await getChatListForUserId(user_id);

		reply.send(chats_list);
	}

	async createChat(user_id: string, chat_info: CreateChatInfoDto, reply: FastifyReply) {
		// пока работаем только с первым типом - личными сообщениями
		// проверить есть ли уже чат данного типа с пользователем
		// если уже есть - вернуть ошибку и id чата
		// если нет - создать новый чат, записать в таблицу chats_members_data пользователей
		// создать первое сообщение в чате

		const member_ids = chat_info.members;

		const chat = await getChatForMemberIds(member_ids);
		if (chat) {
			reply.status(403).send({
				error: 'chat_already_created',
				statusCode: 403,
				message: 'чат уже создан',
				chat_id: chat.chat_id
			});
			return;
		}

		const createChatInfo: CreateChatDto = {
			...chat_info,
			owner_id: user_id,
			chat_id: randomUUID(),
			first_message_id: randomUUID()
		};
		// это говнище нужно нормально типизировать, иначе выходит пиздец
		const new_chat = await createNewChat(createChatInfo);

		const new_chat_dto = getNewChatFrontDto(new_chat);

		reply.send(new_chat_dto);
	}

	async getChatForId(userId: string, chatId: string, reply: FastifyReply) {

		const chat = await getChatForId(chatId);

		reply.send(chat);

	}

}

export default new ChatsService();