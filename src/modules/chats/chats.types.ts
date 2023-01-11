import { FastifyReply, FastifyRequest } from 'fastify';


export interface CreateChatInfoDto {
    members: Array<string>,
    chat_type: 1 | 2 | 3,
    start_message: string
}

export interface ChatDto extends CreateChatInfoDto {
    chat_id: string,
    owner_id: string
}

export interface CreateChatDto extends ChatDto {
    first_message_id: string
}


interface CreateChatMessage {
    message_id: string,
    owner_id: string,
    owner: {
        name: string
    }
}

export interface CreatedChatDtoDb {
    id: number,
    chat_type: number,
    chat_id: string,
    owner_id: string,
    createdAt: string,
    messages: CreateChatMessage[]
}

export interface CreatedChatDtoToFront {
    id: number,
    chat_type: number,
    chat_id: string,
    owner_id: string,
    createdAt: string,
    firstMessage: {
        message_id: string,
        owner_id: string,
        owner_name: string
    }
}



export type CreateChatRequest = FastifyRequest<{ Body: CreateChatInfoDto }>;