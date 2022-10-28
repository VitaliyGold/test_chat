import prisma from "../../utils/prisma";
import { RegistrationData } from "./types";

export async function getUserByLogin(login: string) {
    return await prisma.auth_data.findUnique({
        where: {
            login: login
        }
    })
}

export async function createNewUser(authData: RegistrationData) {
    return await prisma.auth_data.create({
        data: {
            ...authData
        }
    })
}