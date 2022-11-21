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



export type CreateChatRequest = FastifyRequest<{ Body: CreateChatInfoDto }>;