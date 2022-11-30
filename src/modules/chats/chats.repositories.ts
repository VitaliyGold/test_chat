import prisma from "../../utils/prisma";
import { ChatDto } from "./chats.types";
import { Prisma } from '@prisma/client'

export async function findChatForId(chat_id: string) {
    return prisma.chats_data.findUnique({
        where: {
            chat_id: chat_id
        }
    })
}

export async function createNewChat(chat_info: ChatDto) {
    console.log(chat_info)
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
                            owner_id: chat_info.owner_id,
                            message_text: chat_info.start_message
                         }
                    ]
                }
            }
        })
    } catch(e) {
        return e
    }
    
}
