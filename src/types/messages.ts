enum MessageTypes {
    'system' = 1,
    'users' = 2
}


export interface MessageDto {
    text_message: string,
    owner_id: string,
    chat_id: string,
    message_id: string,
    watched: boolean,
    message_type: MessageTypes,
    time_send: Date
}