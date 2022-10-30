import { v4 as uuidv4 } from 'uuid';
import { FastifyRequest, FastifyReply } from 'fastify';
import { RegistrationRequest } from './types';
import { getUserByLogin, createNewUser } from './auth.repositories';

const bcrypt = require('bcrypt');

class AuthService {

    async registration(request: RegistrationRequest, reply: FastifyReply) {
        const { login, password, name } = request.body;
        const user = await getUserByLogin(login)
        if (user) {
            return reply.status(400).send({
                error: true,
                errorMessage: 'This login already used'
            })
        }

        const user_id = uuidv4();

        const hashPassword = await bcrypt.hash(password, 10)

        const createdUser = await createNewUser({ login, password: hashPassword, user_id })
        console.log(createdUser)
        return reply.status(201).send({
            user_id,
            token: '1244'
        })
        
    }
    /*
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
    */
    
}

export default new AuthService()