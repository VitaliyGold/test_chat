import { FastifyReply, FastifyInstance } from 'fastify';
import { getUserById } from './users.repositories';
import { validate } from 'uuid';

class UsersService {
    async getUserById(fastify: FastifyInstance, user_id: string, reply: FastifyReply) {
        if (!user_id || !validate(user_id)) {
            return reply.status(400).send({
                error: true, 
                errorMessage: 'Некорректный идентификатор пользователя' 
            })
        }

        const user = await getUserById(fastify.pg, user_id)

        if (!user) {
            return reply.status(400).send({
                error: true, 
                errorMessage: 'Некорректный идентификатор пользователя' 
            })
        }

        return reply.status(200).send(user)

    }
}

export default new UsersService()