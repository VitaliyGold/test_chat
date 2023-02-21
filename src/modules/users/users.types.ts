import { AuthRequestParams } from '../auth/types';
import { FastifyRequest } from 'fastify';

type ChatMember = {
    chatId: string,
    userId: string
}

export type UserWithChatFromBd = {
    userId: string,
    userDescription: string,
    name: string,
    chatsMembersList: ChatMember[]
}

export type UserWithChatsToFront = {
    userId: string,
    name: string,
    haveChat: boolean,
    chatId: string | null,
    userDescription: string
}


type GetUsersFilter = {
    name: string,
    page: number
}

export type GetUserByIdRequest = FastifyRequest<{ Querystring: { userId: string } }> & AuthRequestParams;

export type GetUsersList = FastifyRequest<{ Querystring: GetUsersFilter }> & AuthRequestParams;
