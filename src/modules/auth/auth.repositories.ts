import prisma from '../../utils/prisma';
import { CreateUserDto, TokensList } from './types';

export async function getUserByLogin(login: string) {
	return await prisma.authData.findUnique({
		where: {
			login: login
		}
	});
}

export async function getTokensFromBlackList() {
	return await prisma.tokenBlackList.findMany();
}

export async function setTokenToBlackList(tokens: TokensList) {
	return await prisma.tokenBlackList.createMany({
		data: tokens
	})
}

export async function createNewUser(authData: CreateUserDto) {
	return await prisma.authData.create({
		data: {
			userId: authData.userId,
			login: authData.login,
			password: authData.password,
			Profile:{
				create: {
					name: authData.name,
					avatarLink: authData.avatarLink,
					userLink: authData.userLink
				}
			}
		}
	});
}