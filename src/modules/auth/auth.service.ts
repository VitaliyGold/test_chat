import { loadEnv } from './../../helpers/helpers';
import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';
import { RegistrationRequest } from '../../types/auth';
import { FastifyInstance } from 'fastify';
import { PostgresDb } from '@fastify/postgres';
const bcrypt = require('bcrypt');

class RegistrationService {

    async registration(fastify: FastifyInstance, req: RegistrationRequest, reply: FastifyReply) {
        const { login, password } = req.body;
        if (!this.validateLogin(login) && this.validatePassword(password)) {
            return reply.code(400).send({ error: true, errorMessage: 'Некорректные данные' })
        }
        const user = await this.getUserToLogin(fastify.pg, login)

        if (user) {
            return reply.code(400).send({ error: true, errorMessage: 'Такой логин уже есть' })
        }
        console.log(1234)
        const hashPassword = await bcrypt.hashSync(password, 10)
        console.log(hashPassword)
        const user_id = uuidv4()

        const new_user = await this.createNewUser(fastify.pg, login, hashPassword, user_id)
        console.log(new_user);
        return reply.code(201).send();
    }

    async getUserToLogin(bd: PostgresDb, user_login: string) {
        const { rows } = await bd.query(
            `SELECT login FROM auth_data WHERE login=$1`, [user_login]
        )
        console.log(rows)
        if (rows.length) {
            return rows
        }
        return null
    }

    async createNewUser(bd: PostgresDb, login: string, password: string, user_id: string) {
        console.log(login)
        return await bd.query('INSERT INTO auth_data (login, password, user_id) VALUES ($1, $2, $3) RETURNING id', [login, password, user_id])
    }

    validateLogin(login: string) {
        if (login.length < 5) {
            return false
        }
        return true
    }

    validatePassword(password: string) {
        if (password.length < 5) {
            return false
        }
        return true
    }

    
}

export default new RegistrationService()