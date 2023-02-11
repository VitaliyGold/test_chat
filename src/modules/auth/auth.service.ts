import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyInstance } from 'fastify';
import { RegistrationRequest, CheckLoginRequest, LoginRequest, RequestWithAuth } from './types';
import { getUserByLogin, createNewUser, setTokenToBlackList } from './auth.repositories';
import { AuthErrors } from './auth.errors';
import { TokenBlackList } from '@prisma/client';

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
		}, {expiresIn: '2m'});

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
		}, {expiresIn: '2m'});

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
	async refresh(fastify: FastifyInstance, req: RequestWithAuth, reply: FastifyReply) {

		const refreshToken = req.cookies.refreshToken;
		try {
			if (!refreshToken || fastify.tokensBlackList.has(refreshToken)) {
				throw new Error();
			}

			const decoded = fastify.jwt.verify(refreshToken)
			
			const newAccessToken = fastify.jwt.sign(
				// @ts-ignore
				{ userId: decoded.userId },
				{ expiresIn: '2m' }
				);
			reply.send({
				token: newAccessToken
			});

		} catch(e) {
			reply.status(401).send({ message: 'Invalid Auth' });
		}
	}
    
	async logout(fastify: FastifyInstance, req: RequestWithAuth, reply: FastifyReply) {

		const refreshToken = req.cookies.refreshToken;
		const accessToken = req.headers.authorization.split(' ')[1];

		try {
			const tokensList = [ { token: refreshToken }, { token: accessToken } ];
			await setTokenToBlackList(tokensList);
			fastify.tokensBlackList.add(refreshToken);
			fastify.tokensBlackList.add(accessToken);
			reply.clearCookie('refreshToken').status(200).send(true);
		} catch(e) {
			console.log(e);
			reply.status(500).send({ message: 'Ошибка авторизации' });
		}
	}
}

export default new AuthService();