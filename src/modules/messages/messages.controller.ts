import MessagesService from './messages.service';
import { FastifyReply } from 'fastify';
import { SendMessageRequest, GetMessageListRequest } from './messages.types';


class MessagesController {
	async SendMessagesHandler(request: SendMessageRequest, reply: FastifyReply) {
		const { userId } = request.user;
		const message = request.body;
		return MessagesService.sendMessage(userId, message, reply);
	}

	async GetMessagesList(request: GetMessageListRequest, reply: FastifyReply) {
		const { userId } = request.user;
		const { chatId } = request.query;
		let { page } = request.query;
		if (!page) page = 0;
		return MessagesService.getList(userId, chatId, page, reply);
	}
   
}

export default new MessagesController();