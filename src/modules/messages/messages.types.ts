import { FastifyReply, FastifyRequest } from 'fastify';

export interface SendMessageDto {
    message_type: 1 | 2 | 3,
    message_text: string,
    chat_id: string,
}

export interface MessageDto extends SendMessageDto{
    owner_id: string,
}

export type SendMessageRequest = FastifyRequest<{ Body: SendMessageDto }>