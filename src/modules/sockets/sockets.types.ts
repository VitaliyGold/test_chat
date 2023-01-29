import { WebSocket } from "ws";
import { MessageDtoToFront } from '../messages/messages.types';


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