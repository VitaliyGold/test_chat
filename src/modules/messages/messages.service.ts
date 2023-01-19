import { SendMessageDto, MessageDto } from './messages.types';
import { FastifyReply } from 'fastify';
import { sendMessage, getMessageList } from './messages.repositories';
import { randomUUID } from 'crypto';

class MessagesService {
	async sendMessage(userId, messageInfo, reply: FastifyReply) {

		const message = {
			...messageInfo,
			ownerId: userId,
			messageId: randomUUID()
		};

		const chatsList = await sendMessage(message);
		reply.send(chatsList);
	}

	async getList(userId, chatId, page: number, reply: FastifyReply) {

		// вот тут должна быть проверка, может ли пользователь получить этот чат
 
		const messageList = await getMessageList(chatId, page);

		reply.send(messageList);
	}
}

export default new MessagesService();