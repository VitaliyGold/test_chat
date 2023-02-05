import { FastifyReply } from 'fastify';
import { CreateChatInfoDto, CreateChatDto, ChatTypes } from './chats.types';
import { 
	createNewChat, getChatListForUserId, getChatForMemberIds, 
	getChatForId, getChatMembers
} from './chats.repositories';
import { randomUUID } from 'crypto';
import { getNewChatFrontDto, getChatMembersToFront, getChatToFront } from './chats.mappers';
class ChatsService {
	async getChatListForUserId(userId, reply: FastifyReply) {
		const chatsList = await getChatListForUserId(userId);

		reply.send(chatsList);
	}

	async createChat(userId: string, chatInfo: CreateChatInfoDto, reply: FastifyReply) {
		// пока работаем только с первым типом - личными сообщениями
		// проверить есть ли уже чат данного типа с пользователем
		// если уже есть - вернуть ошибку и id чата
		// если нет - создать новый чат, записать в таблицу chats_members_data пользователей
		// создать первое сообщение в чате

		if (!ChatTypes[chatInfo.chatType]) {
			reply.status(403).send({
				error: 'incorrect_chat_type',
				statusCode: 403,
				message: 'Некорректный тип чата',
			});
			return;
		}

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
		const newChat = await createNewChat(createChatInfo);

		reply.send(getNewChatFrontDto(newChat));
	}

	async getChatMembers(chatId: string, reply: FastifyReply) {
		const chatMembers = await getChatMembers(chatId);

		reply.send(getChatMembersToFront(chatMembers))
	}

	async getChatForId(userId: string, chatId: string, reply: FastifyReply) {

		const chat = await getChatForId(chatId);

		reply.send(getChatToFront(chat, userId));

	}

}

export default new ChatsService();