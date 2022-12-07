import { SendMessageDto, MessageDto } from './messages.types';
import { FastifyReply } from 'fastify';
import { sendMessage } from './messages.repositories';

class MessagesService {
    async sendMessage(user_id: string, message_info: SendMessageDto, reply: FastifyReply) {

        const message = {
            ...message_info,
            owner_id: user_id
        }

        const chats_list = await sendMessage(message);
        console.log(chats_list)
        reply.send(chats_list)
    }
}

export default new MessagesService();