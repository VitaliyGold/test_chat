import ChatsService from './chats.service';
import { FastifyReply } from 'fastify';
import { CreateChatRequest, GetChatsRequest, GetChatForIdRequest } from './chats.types';

class ChatsController {
	async CreateChatHandler(request: CreateChatRequest, reply: FastifyReply) {
		const { user_id } = request.user;
		const chat_info = request.body;
		return ChatsService.createChat(user_id, chat_info, reply);
	}

	async GetChatsHandler(request: GetChatsRequest, reply: FastifyReply) {
		const { user_id } = request.user;

		return ChatsService.getChatListForUserId(user_id, reply);
	}

	async GetChatForIdHandler(request: GetChatForIdRequest, reply: FastifyReply) {
		const { user_id } = request.user;

		const { chatId } = request.query;

		return ChatsService.getChatForId(user_id, chatId, reply);
	}

   
}

export default new ChatsController();