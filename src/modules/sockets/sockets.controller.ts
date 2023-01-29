import { SocketStream } from '@fastify/websocket';
import { AuthRequestParams } from '../auth/types';
import SocketService from './sockets.service';

class SocketController {

    socketRouteHandler(connection: SocketStream, request: AuthRequestParams): void {
        
        const { userId } = request.user;
        console.log('пользователь подключился')
        SocketService.userConnectedHandler(userId, connection.socket)

        connection.socket.on('close', (message) => {
            // тут было бы неплохо добавить обработку кода, почему пользователь отвалился
            console.log('Пользователь отвалился')
            SocketService.userDisconnectedHandler(userId);
        })
    }



}

export default new SocketController()