import { FastifyRequest } from 'fastify';
import { AuthRequestParams } from '../auth/types';


export enum ChatTypes {
    SINGLE = 0,
    DIALOG = 1,
    MONOLOG = 2,
    DISCURS = 3
}

export interface CreateChatInfoDto {
    members: Array<string>,
    chatType: ChatTypes,
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

interface ChatMemberUserInfo {
    avatarLink: string,
    name: string
}


// типы приходящие при запросе призмы
interface ChatMemberDtoDb {
    userId: string,
    user: {
        name: string
    }
}

export interface ChatDtoFromBd {
    chatId: string,
    ownerId: string,
    chatType: Number,
    member: ChatMemberDtoDb[]
}

export interface CreatedNewChatDtoFromBd extends ChatDtoFromBd{
    messages: CreateChatMessage[]
}

export interface ChatMembersDtoDb {
    chatId: string,
    userId: string,
    user: ChatMemberUserInfo
}


// типы которые нужно пробросить на фронт
interface ChatMemberDtoFront {
    name: string,
    userId: string
}

export interface ChatDtoToFront {
    chatId: string,
    ownerId: string,
    chatType: ChatTypes,
    members: ChatMemberDtoFront[]
}

export interface CreatedChatDtoToFront extends ChatDtoToFront {
    firstMessage: {
        messageId: string,
        ownerId: string,
        name: string,
        messageText: string,
        createdAt: string
    }
}

export interface ChatMemberDtoToFront extends ChatMemberUserInfo {
    chatId: string,
    userId: string,
}



// типы запросов


export type CreateChatRequest = FastifyRequest<{ Body: CreateChatInfoDto }> & AuthRequestParams;

export type GetChatsRequest = FastifyRequest & AuthRequestParams; 

export type GetChatMembersRequest = FastifyRequest<{ Querystring: { chatId: string } }> & AuthRequestParams; 

export type GetChatForIdRequest = FastifyRequest<{ Querystring: { chatId: string } }> & AuthRequestParams;

// потом сюда же добавить типизацию ответов