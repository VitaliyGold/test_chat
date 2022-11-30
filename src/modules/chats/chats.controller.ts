import ChatsService from './chats.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateChatRequest, CreateChatInfoDto } from './chats.types';

class ChatsController {
    async CreateChatHandler(request: CreateChatRequest, reply: FastifyReply) {
        // @ts-ignore
        const { user_id } = request.user;
        const chat_info = request.body;
        return ChatsService.createChat(user_id, chat_info, reply);
    }

    async GetChatsHandler(request: FastifyRequest, reply: FastifyReply) {
        // @ts-ignore
        const { user_id } = request.user;

        return ChatsService.getChatListForUserId(user_id, reply);
    }

   
}

export default new ChatsController()