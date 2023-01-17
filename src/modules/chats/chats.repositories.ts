import prisma from "../../utils/prisma";
import { CreateChatDto } from "./chats.types";

export async function getChatForId(chat_id: string) {
    return prisma.chats_data.findUnique({
        where: {
            chat_id: chat_id
        },
        include: {
            member: {
                select: {
                    user_id: true,
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
}

export async function createNewChat(chat_info: CreateChatDto) {
    try {
        return await prisma.chats_data.create({
            data: {
                chat_id: chat_info.chat_id,
                chat_type: chat_info.chat_type,
                owner_id: chat_info.owner_id,
                member: {
                    createMany: {
                        data: [
                            { user_id: chat_info.members[0] },
                                
                            { user_id: chat_info.members[1] }
                        ]
                    }
                },
                messages: {
                    create: [
                        { 
                            message_id: chat_info.first_message_id,
                            owner_id: chat_info.owner_id,
                            message_text: chat_info.start_message
                         }
                    ],
                },
            },
            select: {
                id: false,
                chat_type: false,
                chat_id: true,
                createdAt: true,
                owner_id: true,
                member: {
                    select: {
                        user_id: true,
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                messages: {
                    select: {
                        message_id: true,
                        owner_id: true,
                        createdAt: true,
                        message_text: true,
                        owner: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
    } catch(e) {
        return e
    }
    
}

export async function getChatListForUserId(user_id: string) {
    console.log(user_id)
    try {
        return await prisma.chats_members_data.findMany({
            where: {
                user_id: user_id,
            },
            include: {
                chat: {
                    include: {
                        messages: {
                            orderBy: {
                                createdAt: 'desc'
                            },
                            take: 1
                            
                        }
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                },
                
            }
        })
    } catch(e) {
        return e
    }
    
}

export async function getChatForMemberIds(member_ids: Array<string>) {
    try {
        return prisma.chats_data.findFirst({
            where: {
                member: {
                    every: {
                        user_id: {
                            in: member_ids
                        }
                    }
                }
            }
        })
    } catch(e) {
        console.log(e)
    }
}
