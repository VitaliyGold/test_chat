import { loadEnv } from './../../helpers/helpers';
import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';
import { RegistrationRequest, CheckLoginRequest, LoginRequest } from '../../types/auth';
import { FastifyInstance } from 'fastify';

import { validateLength } from './helpers';
import { getUserToLogin, createNewUser } from './auth.repositories';
const bcrypt = require('bcrypt');

class RegistrationService {

    async registration(fastify: FastifyInstance, req: RegistrationRequest, reply: FastifyReply) {
        const { login, password, name } = req.body;
        if (!validateLength([[login, 5], [password, 5], [name, 1]])) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Некорректные данные' 
            })
        }
        const user = await getUserToLogin(fastify.pg, login)

        if (user) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Такой пользователь уже есть' 
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user_id = uuidv4()

        await createNewUser(fastify.pg, { login, password: hashPassword, name, user_id })
        return reply.code(201).send({ user_id });
    }

    async checkLogin(fastify: FastifyInstance, req: CheckLoginRequest, reply: FastifyReply) {
        const { login } = req.body;
        
        const user = await getUserToLogin(fastify.pg, login)

        if (user) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Такой пользователь уже есть' 
            })
        }
        return reply.code(200).send({
            result: true
        });
    }

    async login(fastify: FastifyInstance, req: LoginRequest, reply: FastifyReply) {

        const { login, password } = req.body;

        if (!validateLength([[login, 5], [password, 5])) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Некорректные данные' 
            })
        }

        const user = await getUserToLogin(fastify.pg, login)

        if (!user) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Пользователя не существует' 
            })
        }

        const validPassword = bcrypt.compare(myPlaintextPassword, user.password)



        return reply.code(200).send({
            result: true
        });

    }

    

    

    
}

export default new RegistrationService()