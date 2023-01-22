import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyInstance } from 'fastify';
import { RegistrationRequest, CheckLoginRequest, LoginRequest, RefreshRequest } from './types';
import { getUserByLogin, createNewUser } from './auth.repositories';
import { AuthErrors } from './auth.errors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

class AuthService {

	async registration(fastify: FastifyInstance, request: RegistrationRequest, reply: FastifyReply) {
		const { login, password, name } = request.body;
		const userWithLogin = await getUserByLogin(login);
		if (userWithLogin) {
			return reply.status(400).send(AuthErrors.busyLogin);
		}
		const userId = uuidv4();

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = {
			login,
			password: hashPassword,
			userId,
			name,
			userLink: '',
			avatarLink: ''
		};

		await createNewUser(newUser);

		const token = fastify.jwt.sign({
			name: 'authToken',
			userId
		}, {expiresIn: '1d'});

		const refreshToken = fastify.jwt.sign({
			name: 'refreshToken',
			userId
		}, {expiresIn: '2d'});

		return reply.code(200).setCookie('refreshToken', refreshToken, {
			path: '/',
			secure: false,
			httpOnly: true,
			sameSite: false
		}).send({
			token,
			userId
		});
        
	}
	async checkLogin(req: CheckLoginRequest, reply: FastifyReply) {
		const { login } = req.body;

		const user = await getUserByLogin(login);
		if (user) {
			return reply.code(400).send(AuthErrors.busyLogin);
		}
		return reply.code(200).send({
			result: true
		});
	}
	async login(fastify: FastifyInstance, req: LoginRequest, reply: FastifyReply) {

		const { login, password } = req.body;

		const user = await getUserByLogin(login);

		if (!user) {
			return reply.code(400).send(AuthErrors.userNotExist);
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return reply.code(400).send(AuthErrors.wrongAuthData);
		}

		const token = fastify.jwt.sign({
			name: 'authToken',
			userId: user.userId
		}, {expiresIn: '1d'});

		const refreshToken = fastify.jwt.sign({
			name: 'refreshToken',
			userId: user.userId
		}, {expiresIn: '2d'});

		return reply.code(200).setCookie('refreshToken', refreshToken, {
			path: '/',
			secure: false,
			httpOnly: true,
			sameSite: false
		}).send({
			token,
			userId: user.userId
		});

	}
	async refresh(fastify: FastifyInstance, req: RefreshRequest, reply: FastifyReply) {
		// @ts-ignore
		const { userId } = await req.jwtVerify({ onlyCookie: true });

		if (!userId) {
			return reply.status(401).send('Внутри нет токена пользователя');
		}

		const token = fastify.jwt.sign({
			name: 'authToken',
			userId: userId
		}, {expiresIn: '1d'});

		const refreshToken = fastify.jwt.sign({
			name: 'refreshToken',
			userId
		}, {expiresIn: '2d'});

		return reply.status(200)
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: false,
				httpOnly: true,
				sameSite: false
			})
			.send({
				token
			});
	}
    
}

export default new AuthService();