import { AuthRequestParams } from '../auth/types';
import { FastifyRequest } from 'fastify';

type GetUsersFilter = {
    name: string,
    page: number
}

export type GetUserByIdRequest = FastifyRequest<{ Params: { userId: string } }> & AuthRequestParams;

export type GetUsersList = FastifyRequest<{ Querystring: GetUsersFilter }> & AuthRequestParams;


export type UserWithChats = {
    user_id: string,
    name: string,
    have_chat: boolean,
    chat_id: string | null
}

export type UsersList = Array<UserWithChats>
