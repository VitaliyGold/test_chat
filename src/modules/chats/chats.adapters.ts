import { CreatedChatDtoDb, CreatedChatDtoToFront } from "./chats.types";

export function getNewChatFrontDto(chat_data: CreatedChatDtoDb): CreatedChatDtoToFront {

    const members = chat_data.member.map((member) => {
        return {
            userId: member.user_id,
            name: member.user.name
        }
    })

    return {
        chatId: chat_data.chat_id,
        ownerId: chat_data.owner_id,
        createdAt: chat_data.createdAt,
        members,
        firstMessage: {
            messageText: chat_data.messages[0].message_text,
            messageId: chat_data.messages[0].message_id,
            ownerId: chat_data.messages[0].owner_id,
            ownerName: chat_data.messages[0].owner.name,
            createdAt: chat_data.messages[0].createdAt
        }
    }

}

/*
export getNewChatFrontDto(chatData) {

}
*/