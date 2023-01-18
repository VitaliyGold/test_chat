import MessagesService from './messages.service';
import { FastifyReply } from 'fastify';
import { SendMessageRequest, GetMessageListRequest } from './messages.types';


class MessagesController {
	async SendMessagesHandler(request: SendMessageRequest, reply: FastifyReply) {
		const { user_id } = request.user;
		const chat_info = request.body;
		return MessagesService.sendMessage(user_id, chat_info, reply);
	}

	async GetMessagesList(request: GetMessageListRequest, reply: FastifyReply) {
		const { user_id } = request.user;
		let { chat_id, page } = request.query;
		if (!page) page = 0;
		return MessagesService.getList(user_id, chat_id, page, reply);
	}
   
}

export default new MessagesController();