import { FastifyReply } from 'fastify';
import { CreateChatInfoDto, CreateChatDto } from './chats.types';
import { createNewChat, getChatListForUserId, getChatForMemberIds, getChatForId } from './chats.repositories';
import { randomUUID } from 'crypto';
import { getNewChatFrontDto } from './chats.adapters';
class ChatsService {
	async getChatListForUserId(userId, reply: FastifyReply) {
		const chatsList = await getChatListForUserId(userId);

		reply.send(chatsList);
	}

	async createChat(userId, chatInfo, reply: FastifyReply) {
		// пока работаем только с первым типом - личными сообщениями
		// проверить есть ли уже чат данного типа с пользователем
		// если уже есть - вернуть ошибку и id чата
		// если нет - создать новый чат, записать в таблицу chats_members_data пользователей
		// создать первое сообщение в чате

		const memberIds = chatInfo.members;

		const chat = await getChatForMemberIds(memberIds);
		if (chat) {
			reply.status(403).send({
				error: 'chat_already_created',
				statusCode: 403,
				message: 'чат уже создан',
				chatId: chat.chatId
			});
			return;
		}

		const createChatInfo: CreateChatDto = {
			...chatInfo,
			ownerId: userId,
			chatId: randomUUID(),
			firstMessageId: randomUUID()
		};
		// это говнище нужно нормально типизировать, иначе выходит пиздец
		const newChat = await createNewChat(createChatInfo);

		const newChatDto = getNewChatFrontDto(newChat);

		reply.send(newChatDto);
	}

	async getChatForId(userId: string, chatId: string, reply: FastifyReply) {

		const chat = await getChatForId(chatId);

		reply.send(chat);

	}

}

export default new ChatsService();