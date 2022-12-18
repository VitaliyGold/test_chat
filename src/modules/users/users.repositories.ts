import prisma from "../../utils/prisma";

export async function getUserProfileById(id: string) {
    return prisma.profile_data.findUnique({
        where: {
            user_id: id
        },
        select: {
            name: true,
            user_id: true,
            chats_data: {
                select: {
                    chat_id: true
                }
            }
        }
    })
}