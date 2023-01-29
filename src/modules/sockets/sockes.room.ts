import { UsersOnline, User } from './sockets.types';
import { WebSocket } from 'ws';

class Sockets {

    private usersOnline: UsersOnline;

    constructor() {
        this.usersOnline = new Map();
    }

    addUserOnline(userId: string, user: User):void {
        this.usersOnline.set(userId, user);
    }

    deleteUserOnline(userId: string):void {
        this.usersOnline.delete(userId);
    }

    getSocketForUserID(userId: string): WebSocket | null {
        if (this.usersOnline.get(userId)) {
            return this.usersOnline.get(userId).socket;
        }
        return null
    }



}


export default new Sockets();