import { FastifyReply } from 'fastify';
import { getUserProfileById } from './users.repositories';

class UsersService {
    async getUserById(id: string, reply: FastifyReply) {
        const user = await getUserProfileById(id);
        reply.send(user);
    }
    /*
    async getUsers(name: string, page: number, reply: FastifyReply) {
        const users = await getUsersList(name, page)
        reply.send(users)
    }
    */
}

export default new UsersService()