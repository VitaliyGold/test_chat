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
    message_text: string,
    createdAt: string,
    owner: {
        name: string
    }
}

interface ChatMemberDtoDb {
    user_id: string,
    user: {
        name: string
    }
}

export interface CreatedChatDtoDb {
    chat_id: string,
    owner_id: string,
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



export type CreateChatRequest = FastifyRequest<{ Body: CreateChatInfoDto }>;