import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthRequestParams } from '../auth/types';

export interface CreateChatInfoDto {
    members: Array<string>,
    chatType: 1 | 2 | 3,
    startMessage: string
}

export interface ChatDto extends CreateChatInfoDto {
    chatId: string,
    ownerId: string
}

export interface CreateChatDto extends ChatDto {
    firstMessageId: string
}


interface CreateChatMessage {
    messageId: string,
    ownerId: string,
    messageText: string,
    createdAt: string,
    owner: {
        name: string
    }
}

interface ChatMemberDtoDb {
    userId: string,
    user: {
        name: string
    }
}

export interface CreatedChatDtoDb {
    chatId: string,
    ownerId: string,
    createdAt: string,
    member: ChatMemberDtoDb[]
    messages: CreateChatMessage[]
}

interface ChatMemberDtoFront {
    name: string,
    userId: string
}

export interface CreatedChatDtoToFront {
    chatId: string,
    ownerId: string,
    createdAt: string,
    members: ChatMemberDtoFront[]
    firstMessage: {
        messageId: string,
        ownerId: string,
        ownerName: string,
        messageText: string,
        createdAt: string
    }
}



export type CreateChatRequest = FastifyRequest<{ Body: CreateChatInfoDto }> & AuthRequestParams;

export type GetChatsRequest = FastifyRequest & AuthRequestParams; 

export type GetChatForIdRequest = FastifyRequest<{ Querystring: { chatId: string } }> & AuthRequestParams;