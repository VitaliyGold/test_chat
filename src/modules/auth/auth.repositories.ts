import prisma from "../../utils/prisma";
import { CreateUserAuthTable } from "./types";

export async function getUserByLogin(login: string) {
    return await prisma.auth_data.findUnique({
        where: {
            login: login
        }
    })
}

export async function createNewUser(authData: CreateUserAuthTable) {
    return await prisma.auth_data.create({
        data: {
            ...authData
        }
    })
}