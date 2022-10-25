import { FastifyRequest } from 'fastify';
import { MessageDto } from './messages';

enum ChatTypes{
    'one-to-one' = 1,
    'one-to-many' = 2,
    'many-to-many' = 3

}

export interface createChatDto {
    chat_type: ChatTypes,
    owner_id: string,
    member_ids: string[],
    chat_name: string | null
}

export interface ChatDto {
    chat_type: ChatTypes,
    chat_id: string,
    owner_id: string,
    member_ids: string[],
    chat_name: string | null,
    lastMessage: MessageDto | null
}