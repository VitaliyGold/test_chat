import { FastifyReply } from "fastify";
import { CreateChatInfoDto, ChatDto } from './chats.types';
import { createNewChat, getChatListForUserId, getChatForMemberIds } from './chats.repositories';
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

        const member_ids = chat_info.members;

        const chat = await getChatForMemberIds(member_ids);
        
        if (chat) {
            reply.status(403).send({
                error: 'chat_already_created',
                statusCode: 403,
                message: 'чат уже создан',
                chat_id: chat.chat_id
            });
            return
        }
        console.log(222)

        const createChatInfo: ChatDto = {
            ...chat_info,
            owner_id: user_id,
            chat_id: uuidv4()
        }

        const new_chat = await createNewChat(createChatInfo);
        reply.send(new_chat);
    }
}

export default new ChatsService()