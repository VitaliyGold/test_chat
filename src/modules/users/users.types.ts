import { AuthRequestParams } from '../auth/types';
import { FastifyRequest } from 'fastify';

type GetUsersFilter = {
    name: string,
    page: number
}

export type GetUserByIdRequest = FastifyRequest<{ Params: { userId: string } }> & AuthRequestParams;

export type GetUsersList = FastifyRequest<{ Querystring: GetUsersFilter }> & AuthRequestParams;


export type UserWithChats = {
    userId: string,
    name: string,
    haveChat: boolean,
    chatId: string | null
}

export type UsersList = Array<UserWithChats>
