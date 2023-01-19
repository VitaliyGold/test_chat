import { CreatedChatDtoDb, CreatedChatDtoToFront } from './chats.types';

export function getNewChatFrontDto(chatData): CreatedChatDtoToFront {

	const members = chatData.member.map((member) => {
		return {
			userId: member.userId,
			name: member.user.name
		};
	});

	return {
		chatId: chatData.chatId,
		ownerId: chatData.ownerId,
		createdAt: chatData.createdAt,
		members,
		firstMessage: {
			messageText: chatData.messages[0].messageText,
			messageId: chatData.messages[0].messageId,
			ownerId: chatData.messages[0].ownerId,
			ownerName: chatData.messages[0].owner.name,
			createdAt: chatData.messages[0].createdAt
		}
	};

}

/*
export getNewChatFrontDto(chatData) {

}
*/