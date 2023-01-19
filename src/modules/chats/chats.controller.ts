import ChatsService from './chats.service';
import { FastifyReply } from 'fastify';
import { CreateChatRequest, GetChatsRequest, GetChatForIdRequest } from './chats.types';

class ChatsController {
	async CreateChatHandler(request: CreateChatRequest, reply: FastifyReply) {
		const { userId } = request.user;
		const chatInfo = request.body;
		return ChatsService.createChat(userId, chatInfo, reply);
	}

	async GetChatsHandler(request: GetChatsRequest, reply: FastifyReply) {
		const { userId } = request.user;

		return ChatsService.getChatListForUserId(userId, reply);
	}

	async GetChatForIdHandler(request: GetChatForIdRequest, reply: FastifyReply) {
		const { userId } = request.user;

		const { chatId } = request.query;

		return ChatsService.getChatForId(userId, chatId, reply);
	}

   
}

export default new ChatsController();