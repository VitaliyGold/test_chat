import { MessageDtoFromBd, MessageDtoToFront } from "./messages.types";

export function getMessageToFront(message: MessageDtoFromBd): MessageDtoToFront {
    return {
        messageText: message.messageText,
        chatId: message.chatId,
        ownerId: message.ownerId,
        name: message.owner.name,
        messageId: message.messageId,
        status: 'delivered'
    }
}