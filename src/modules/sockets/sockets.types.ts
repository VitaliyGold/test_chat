import { WebSocket } from "ws";
import { MessageDtoToFront } from '../messages/messages.types';
import { FastifyRequest } from 'fastify';
import { AuthRequestParams } from '../auth/types';


export interface User {
    userId: string,
    socket: WebSocket
}

export type UsersOnline = Map<string, User>;


export interface SocketsClass {
    usersOnline: UsersOnline
}

export type PayloadTypes = 'SendMessage'

export interface SocketPayloadData {
    
}


export type SocketConnectRequest = FastifyRequest & AuthRequestParams;