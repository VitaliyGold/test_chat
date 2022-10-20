import { loadEnv } from './../../helpers/helpers';
import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';
import { RegistrationRequest, CheckLoginRequest, LoginRequest } from '../../types/auth';
import { FastifyInstance } from 'fastify';

import { validateLength } from './helpers';
import { checkUseLogin, createNewUser, getUserData } from './auth.repositories';
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
        const user = await checkUseLogin(fastify.pg, login)

        if (user) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: `Пользователь ${login} уже существует` 
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user_id = uuidv4()
        try {
            await createNewUser(fastify.pg, { login, password: hashPassword, name, user_id })
            
            return reply.code(201).send({ user_id });

        } catch(e) {
            return reply.code(500).send({ 
                error: true, 
                errorMessage: `Произошла ошибка. Попробуйте позже.` 
            })
        }
        
        
    }

    async checkLogin(fastify: FastifyInstance, req: CheckLoginRequest, reply: FastifyReply) {
        const { login } = req.body;
        
        if (!validateLength([[login, 5]])) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Некорректные данные' 
            })
        }

        const user = await checkUseLogin(fastify.pg, login);
        if (user) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: `Пользователь ${login} уже существует` 
            })
        }
        return reply.code(200).send({
            result: true
        });
    }

    async login(fastify: FastifyInstance, req: LoginRequest, reply: FastifyReply) {

        const { login, password } = req.body;

        if (!validateLength([[login, 5], [password, 5]])) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Некорректные данные' 
            })
        }

        const user = await getUserData(fastify.pg, login);

        if (!user) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Пользователя не существует' 
            })
        };

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return reply.code(400).send({ 
                error: true, 
                errorMessage: 'Неверная связка логин/пароль' 
            })
        }

        return reply.code(200).send({
            login: user.login,
            name: user.name,
            user_id: user.user_id
        });

    }
    
}

export default new RegistrationService()