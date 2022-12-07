import MessagesService from './messages.service';
import { FastifyReply } from 'fastify';
import { SendMessageRequest } from './messages.types';


class MessagesController {
    async SendMessagesHandler(request: SendMessageRequest, reply: FastifyReply) {
        // @ts-ignore
        const { user_id } = request.user;
        const chat_info = request.body;
        return MessagesService.sendMessage(user_id, chat_info, reply);
    }
   
}

export default new MessagesController()