import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify';
import { RegistrationRequest, CheckLoginRequest, LoginRequest,  } from './types';
import { getUserByLogin, createNewUser } from './auth.repositories';
import { AuthErrors } from './auth.errors';

const bcrypt = require('bcrypt');

class AuthService {

    async registration(fastify: FastifyInstance, request: RegistrationRequest, reply: FastifyReply) {
        const { login, password, name } = request.body;
        const user = await getUserByLogin(login)
        if (user) {
            return reply.status(400).send(AuthErrors.busy_login)
        }
        const user_id = uuidv4();

        const hashPassword = await bcrypt.hash(password, 10)

        await createNewUser({ login, password: hashPassword, user_id, name });

        const token = fastify.jwt.sign({
            name: 'authToken',
            user_id: user_id
        }, {expiresIn: '2m'});

        const refreshToken = fastify.jwt.sign({
            name: 'refreshToken',
            user_id: user.user_id
        }, {expiresIn: '2d'});

        return reply.code(200).setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: false,
            httpOnly: true,
            sameSite: false
          }).send({
            token,
            user_id
        });
        
    }
    async checkLogin(req: CheckLoginRequest, reply: FastifyReply) {
        const { login } = req.body;

        const user = await getUserByLogin(login)
        if (user) {
            return reply.code(400).send(AuthErrors.busy_login)
        }
        return reply.code(200).send({
            result: true
        });
    }
    async login(fastify: FastifyInstance, req: LoginRequest, reply: FastifyReply) {

        const { login, password } = req.body;

        const user = await getUserByLogin(login);

        if (!user) {
            return reply.code(400).send(AuthErrors.user_not_exist)
        };

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return reply.code(400).send(AuthErrors.wrong_auth_data)
        }

        const token = fastify.jwt.sign({
            name: 'authToken',
            user_id: user.user_id
        }, {expiresIn: '2m'});

        const refreshToken = fastify.jwt.sign({
                name: 'refreshToken',
                user_id: user.user_id
            }, {expiresIn: '2d'});

        return reply.code(200).setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: false,
            httpOnly: true,
            sameSite: false
          }).send({
            token,
            user_id: user.user_id
        });

    }
    async refresh(fastify: FastifyInstance, req: FastifyRequest, reply: FastifyReply) {
        
        // @ts-ignore
        const { user_id } = await req.jwtVerify({ onlyCookie: true })
        
        if (!user_id) {
            return reply.status(401).send('Внутри нет токена пользователя')
        }

        const token = fastify.jwt.sign({
            name: 'authToken',
            user_id: user_id
        }, {expiresIn: '2m'});

        const refreshToken = fastify.jwt.sign({
            name: 'refreshToken',
            user_id: user_id
        }, {expiresIn: '2d'});
        
        return reply.status(200).
            setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: false,
                httpOnly: true,
                sameSite: false
            })
            .send({
                token
            })
    }
    
}

export default new AuthService()