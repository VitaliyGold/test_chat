
import { FastifyPluginAsync } from 'fastify';
import ChatsController from '../../modules/chats/chats.controller';

const chatsRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get('/getChatsListForUserId', ChatsController.GetChatsHandler);

	fastify.post('/createChat', ChatsController.CreateChatHandler);
    
	fastify.get('/getChat', ChatsController.GetChatForIdHandler);
};

export default chatsRoute;