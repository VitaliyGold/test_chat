import { WebSocket } from "ws";
import { MessageDtoToFront } from "../messages/messages.types";
import SocketRoom from './sockes.room';

class SocketsService {

    userConnectedHandler(userId: string, socket: WebSocket): void {
        const user = {
            userId,
            socket
        };
        SocketRoom.addUserOnline(userId, user);
    }

    userDisconnectedHandler(userId: string) {
        SocketRoom.deleteUserOnline(userId);
    }

    sendMessageHandler(userId: string, membersList: string[], message: MessageDtoToFront) {
        for (let i = 0; i < membersList.length; i++) {
            const socket = SocketRoom.getSocketForUserID(membersList[i]);
            if (socket) {
                const data = { type: 'SEND_MESSAGE', data: message };
                console.log(123)
                socket.send(JSON.stringify(data));
            }
        }
    }

}

export default new SocketsService();