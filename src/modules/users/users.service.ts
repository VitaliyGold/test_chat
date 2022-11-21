import { FastifyReply, FastifyInstance } from 'fastify';
import { getUserById } from './users.repositories';

class UsersService {
    async getUserById(user_id: string, reply: FastifyReply) {
        return reply.status(200).send(true)
    }
    async getUsers(req, reply) {
        reply.send('Вот список')
    }
}

export default new UsersService()