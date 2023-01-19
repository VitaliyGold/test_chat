enum MessageTypes {
    'system' = 1,
    'users' = 2
}


export interface MessageDto {
    messageContent: string,
    ownerId: string,
    chatId: string,
    messageId: string,
    watched: boolean,
    messageType: MessageTypes,
    timeSend: Date
}