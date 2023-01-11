import { CreatedChatDtoDb, CreatedChatDtoToFront } from "./chats.types";

export function getNewChatFrontDto(chat_data: CreatedChatDtoDb): CreatedChatDtoToFront {

    return {
        id: chat_data.id,
        chat_type: chat_data.chat_type,
        chat_id: chat_data.chat_id,
        owner_id: chat_data.owner_id,
        createdAt: chat_data.createdAt,
        firstMessage: {
            message_id: chat_data.messages[0].message_id,
            owner_id: chat_data.messages[0].owner_id,
            owner_name: chat_data.messages[0].owner.name
        }
    }

}