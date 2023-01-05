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


export async function getUsersList(name: string, from = 0, count = 50, user_id: string) {
    return prisma.profile_data.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            },
        },
        select: {
            name: true,
            user_id: true,
            chats_members_list: {
                where: {
                    user_id: user_id
                }
            }
        },
        skip: from, 
        take: count
        
    })
}