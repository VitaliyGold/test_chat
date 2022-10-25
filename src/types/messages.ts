enum MessageTypes {
    'system' = 1,
    'users' = 2
}


export interface MessageDto {
    text: string,
    owner_id: string,
    chat_id: string,
    message_id: string,
    checked: boolean,
    message_type: MessageTypes,
    time_send: Date
}