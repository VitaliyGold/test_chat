import { SendMessage } from './messages.types';
import { FastifyReply } from 'fastify';
import { sendMessage, getMessageList } from './messages.repositories';
import { randomUUID } from 'crypto';
import { getMessageToFront } from './messages.mapper';
import { getChatMembers } from '../chats/chats.repositories';
import socketsService from '../sockets/sockets.service';
import { ChatMemberDtoToFront } from '../chats/chats.types';

class MessagesService {
	async sendMessage(userId: string, messageInfo: SendMessage, reply: FastifyReply) {

		const messageDto = {
			...messageInfo,
			ownerId: userId,
			messageId: randomUUID()
		};
		// посмотреть какую-нибудь либу с pipe или подумать над своей реализацией
		const message = await sendMessage(messageDto);

		const mappedMessage = getMessageToFront(message);

		reply.send(mappedMessage);

		const members = await getChatMembers(message.chatId);

		const memberIdsList = members.reduce(( prevValue: string[], curValue ) => {
			if (curValue.userId === userId) {
				return prevValue;
			}
			prevValue.push(curValue.userId);
			return prevValue;
		}, [])

		socketsService.sendMessageHandler(userId, memberIdsList, mappedMessage);
	}

	async getList(userId: string, chatId: string, page: number, reply: FastifyReply) {

		// вот тут должна быть проверка, может ли пользователь получить этот чат
		const messageList = await getMessageList(chatId, Number(page) * 50);

		let mappedMessageList = messageList.map(message => getMessageToFront(message));

		if (page !== 0) {
			mappedMessageList = mappedMessageList.reverse();
		}

		reply.send(mappedMessageList);
	}
}

export default new MessagesService();