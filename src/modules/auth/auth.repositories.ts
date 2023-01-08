import prisma from "../../utils/prisma";
import { CreateUserDto, LoginDto } from "./types";

export async function getUserByLogin(login: string) {
    return await prisma.auth_data.findUnique({
        where: {
            login: login
        }
    })
}

export async function createNewUser(authData: CreateUserDto) {
    return await prisma.auth_data.create({
        data: {
            user_id: authData.user_id,
            login: authData.login,
            password: authData.password,
            Profile:{
                create: {
                    name: authData.name,
                    avatar_link: authData.avatar_link,
                    user_link: authData.user_link
                }
            }
        }
    })
}