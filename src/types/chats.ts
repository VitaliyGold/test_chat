import { FastifyRequest } from 'fastify';

enum ChatTypes{
    'one-to-one' = 1,
    'one-to-many' = 2,
    'many-to-many' = 3

}

export interface Chat {
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
    chat_name: string
}