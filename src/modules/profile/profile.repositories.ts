import prisma from "../../utils/prisma";

export function getProfile(user_id: string) {
    return prisma.profile_data.findUnique({
        where: {
            user_id
        },
        select: {
            name: true,
            user_id: true,
            user_link: true,
            avatar_link: true
        }
    })
}