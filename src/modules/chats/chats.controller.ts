import ChatsService from './chats.service';
import { FastifyReply, FastifyRequest } from 'fastify';

class ChatsController {
    async CreateChatHandler(request: FastifyRequest, reply: FastifyReply) {
        console.log(request.user);
        // @ts-ignore
        const { user_id } = request.user;
        //const chat_info = request.body;
        return reply.send('Все ок')
        //return ChatsService.createChat(user_id, chat_info, reply)
    }

   
}

export default new ChatsController()