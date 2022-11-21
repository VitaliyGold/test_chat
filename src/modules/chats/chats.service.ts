import { FastifyInstance, FastifyReply } from "fastify";

class ChatsService {
    getList(fastify: FastifyInstance, user_id: string, reply: FastifyReply) {
        
    }

    createChatHandler(user_id, chat_info, reply) {
        return reply.send('Чат создан')
    }
}

export default new ChatsService()