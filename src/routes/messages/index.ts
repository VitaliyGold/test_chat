import { FastifyPluginAsync } from 'fastify';
import MessagesController from '../../modules/messages/messages.controller';

const chatsRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/sendMessage', MessagesController.SendMessagesHandler)

}

export default chatsRoute;