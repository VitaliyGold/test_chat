import ChatsService from './chats.service';
import { FastifyReply } from 'fastify';
import { 
	CreateChatRequest, GetChatsRequest, GetChatForIdRequest, 
	GetChatMembersRequest } 
	from './chats.types';

class ChatsController {
	CreateChatHandler(request: CreateChatRequest, reply: FastifyReply) {
		const { userId } = request.user;
		const chatInfo = request.body;
		return ChatsService.createChat(userId, chatInfo, reply);
	}

	GetChatsHandler(request: GetChatsRequest, reply: FastifyReply) {
		const { userId } = request.user;

		return ChatsService.getChatListForUserId(userId, reply);
	}

	GetChatMembers(request: GetChatMembersRequest, reply: FastifyReply) {
		const { chatId } = request.query;

		return ChatsService.getChatMembers(chatId, reply);
	}

	GetChatForIdHandler(request: GetChatForIdRequest, reply: FastifyReply) {
		const { userId } = request.user;

		const { chatId } = request.query;

		return ChatsService.getChatForId(userId, chatId, reply);
	}

   
}

export default new ChatsController();