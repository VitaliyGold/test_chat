
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import ChatsController from '../../modules/chats/chats.controller';

const chatsRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/chatsList', 
        async function(request: FastifyRequest, reply: FastifyReply) {
            const user_id = '12412'

            return {}
        }
    )

    fastify.post('/createChat', ChatsController.CreateChatHandler)
    
}

export default chatsRoute;