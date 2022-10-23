import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';
import { RegistrationRequest, CheckLoginRequest, LoginRequest, RefreshTokenRequest } from '../../types/auth';
import { FastifyInstance } from 'fastify';
import { validateLength } from '../../helpers/helpers';
import { checkUseLogin, createNewUser } from './auth.repositories';
import { getAuthUserData } from './auth.repositories';
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
            
            const token = await reply.jwtSign({
                name: 'authToken',
                id: user_id
            });
    
            const refreshToken = await reply.jwtSign({
                name: 'refreshToken'
            }, {expiresIn: '2d'});

            return reply.code(200)
                .setCookie('refreshToken', refreshToken, {
                    path: '/',
                    secure: false,
                    httpOnly: true,
                    sameSite: false
                })
                .send({ 
                    user_id: user_id,
                    token 
                });

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

        const user = await getAuthUserData(fastify.pg, login);

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

        const token = fastify.jwt.sign({
            name: 'authToken',
            id: user.user_id
        });

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

    async refresh(fastify: FastifyInstance, req: RefreshTokenRequest, reply: FastifyReply) {
        try {
            const refresh = req.cookies.refreshToken
            if (!refresh) {

            }
        } catch(e) {
            reply.status(401).send('идите нахуй')
        }
        
        /* @ts-ignore */
        const { user_id } = await req.jwtVerify({ onlyCookie: true })
        
        if (!user_id) {
            return reply.status(401).send('Внутри нет токена пользователя')
        }

        
        const token = fastify.jwt.sign({
            name: 'authToken',
            id: user_id
        });

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

export default new RegistrationService()