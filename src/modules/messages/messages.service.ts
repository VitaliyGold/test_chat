import { SendMessageDto, MessageDto } from './messages.types';
import { FastifyReply } from 'fastify';
import { sendMessage, getMessageList } from './messages.repositories';

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

    async getList(user_id: string, chat_id: string, page: number, reply: FastifyReply) {

        // вот тут должна быть проверка, может ли пользователь получить этот чат
 
        const message_list = await getMessageList(chat_id, page);

        reply.send(message_list)
    }
}

export default new MessagesService();