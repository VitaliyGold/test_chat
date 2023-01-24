import { SendMessage } from './messages.types';
import { FastifyReply } from 'fastify';
import { sendMessage, getMessageList } from './messages.repositories';
import { randomUUID } from 'crypto';
import { getMessageToFront } from './messages.mapper';

class MessagesService {
	async sendMessage(userId: string, messageInfo: SendMessage, reply: FastifyReply) {

		const messageDto = {
			...messageInfo,
			ownerId: userId,
			messageId: randomUUID()
		};
		// посмотреть какую-нибудь либу с pipe или подумать над своей реализацией
		const message = await sendMessage(messageDto);
		reply.send(getMessageToFront(message));
	}

	async getList(userId: string, chatId: string, page: number, reply: FastifyReply) {

		// вот тут должна быть проверка, может ли пользователь получить этот чат
 
		const messageList = await getMessageList(chatId, Number(page));

		reply.send(messageList.map(message => getMessageToFront(message)));
	}
}

export default new MessagesService();