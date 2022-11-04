import { FastifyReply, FastifyInstance } from 'fastify';
import { getUserById } from './users.repositories';
import { validate } from 'uuid';

class UsersService {
    async getUserById(user_id: string, reply: FastifyReply) {
        return reply.status(200).send(true)
    }
}

export default new UsersService()