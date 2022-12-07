import { FastifyInstance, FastifyReply } from "fastify";
import { CreateChatInfoDto, ChatDto } from './chats.types';
import { createNewChat, getChatListForUserId } from './chats.repositories';
import { v4 as uuidv4 } from 'uuid';
class ChatsService {
    async getChatListForUserId(user_id: string, reply: FastifyReply) {
        const chats_list = await getChatListForUserId(user_id);
        console.log(chats_list)
        reply.send(chats_list)
    }

    async createChat(user_id: string, chat_info: CreateChatInfoDto, reply: FastifyReply) {
        // пока работаем только с первым типом - личными сообщениями
        // проверить есть ли уже чат данного типа с пользователем
        // если уже есть - вернуть ошибку и id чата
        // если нет - создать новый чат, записать в таблицу chats_members_data пользователей
        // создать первое сообщение в чате

        const createChatInfo: ChatDto = {
            ...chat_info,
            owner_id: user_id,
            chat_id: uuidv4()
        }

        const chat = await createNewChat(createChatInfo);
        reply.send(chat);
    }
}

export default new ChatsService()