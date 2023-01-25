import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthRequestParams } from '../auth/types';

// приходит с фронта
export interface SendMessage {
    messageType: 1 | 2 | 3,
    messageText: string,
    chatId: string,
}

// внутренняя модель
export interface MessageDto {
    messageText: string,
    chatId: string,
    ownerId: string,
    messageId: string,
}

// с призмы
export interface MessageDtoFromBd extends MessageDto {
    createdAt: Date,
    owner: {
        name: string
    }
}

// на фронт
export interface MessageDtoToFront extends MessageDto{
    name: string,
    status: 'delivered' | 'read',
    createdAt: Date,
}

export type SendMessageRequest = FastifyRequest<{ Body: SendMessage }> & { user: { userId: string } }

export type GetMessageListRequest = FastifyRequest<{ Querystring: { chatId: string, page: number } }> & { user: { userId: string } }