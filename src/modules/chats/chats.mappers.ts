import { 
	CreatedChatDtoDb, CreatedChatDtoToFront, ChatMembersDtoDb,
	ChatMemberDtoToFront 
} from './chats.types';

export function getNewChatFrontDto(chatData: CreatedChatDtoDb): CreatedChatDtoToFront {

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
			name: chatData.messages[0].owner.name,
			createdAt: chatData.messages[0].createdAt
		}
	};

}

export function getChatMembersToFront(membersData: ChatMembersDtoDb[]): ChatMemberDtoToFront[]  {
	return membersData.map(member => {
		return {
			chatId: member.chatId,
			userId: member.userId,
			name: member.user.name,
			avatarLink: member.user.avatarLink
		}
	})
}