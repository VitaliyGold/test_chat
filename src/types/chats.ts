import { FastifyRequest } from 'fastify';
import { MessageDto } from './messages';

enum ChatTypes{
    'one-to-one' = 1,
    'one-to-many' = 2,
    'many-to-many' = 3

}

export interface createChatDto {
    chatType: ChatTypes,
    ownerId: string,
    membersList: string,
    chatName: string | null
}

export interface ChatDto {
    chatType: ChatTypes,
    chatId: string,
    ownerId: string,
    membersTableId: string,
    membersList: string,
    chatName: string | null,
    lastMessage: MessageDto | null
}