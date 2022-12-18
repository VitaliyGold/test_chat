import prisma from "../../utils/prisma";
import { MessageDto } from './messages.types';


// тут нужно добавить тип возвращаемого объекта
export async function sendMessage(message: MessageDto) {
    return prisma.messages_data.create({
        data: {
            chat_id: message.chat_id,
            owner_id: message.owner_id,
            message_text: message.message_text
        }
    })
}


export async function getMessageList(chat_id: string, skip_number: number) {

    try {
        return prisma.chats_data.findUnique({
            where: {
                chat_id: chat_id
            },
            include: {
                messages: {
                    select: {
                        owner_id: true,
                        message_text: true,
                        createdAt: true
                    },
                    take: 50,
                    skip: skip_number
                },
                member: {
                    select: {
                        user_id: true,
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    },
                }
            }
        })
    } catch(e) {
        console.log(e)
    }
    
}