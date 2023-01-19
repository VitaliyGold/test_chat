import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthRequestParams } from '../auth/types';

export interface SendMessageDto {
    messageType: 1 | 2 | 3,
    messageText: string,
    chatId: string,
}

export interface MessageDto extends SendMessageDto{
    ownerId: string,
    messageId: string
}

export type SendMessageRequest = FastifyRequest<{ Body: SendMessageDto }> & { user: { userId: string } }

export type GetMessageListRequest = FastifyRequest<{ Querystring: { chatId: string, page: number } }> & { user: { userId: string } }