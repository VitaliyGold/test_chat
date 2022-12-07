import prisma from "../../utils/prisma";
import { MessageDto } from './messages.types';

export async function sendMessage(message: MessageDto) {
    return prisma.messages_data.create({
        data: {
            chat_id: message.chat_id,
            owner_id: message.owner_id,
            message_text: message.message_text
        }
    })
}