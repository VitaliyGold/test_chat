import { AuthRequestParams } from '../auth/types';
import { FastifyRequest } from 'fastify';

type ChatMember = {
    chatId: string,
    userId: string
}

export type ProfileFromBd = {
    userId: string,
    userDescription: string,
    userLink: string,
    avatarLink: string,
    name: string,
    chatsMembersList: ChatMember[]
}

export type ProfileToFront = Omit<ProfileFromBd, 'chatsMembersList'> & {
    chatId: string | null,
    haveChat: boolean
}

export type GetProfile = FastifyRequest<{ Querystring: { profileId: string } }> & AuthRequestParams;