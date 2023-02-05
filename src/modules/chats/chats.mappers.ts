import { 
	CreatedNewChatDtoFromBd, CreatedChatDtoToFront, ChatMembersDtoDb,
	ChatMemberDtoToFront, ChatDtoFromBd, ChatDtoToFront, ChatTypes
} from './chats.types';

export function getNewChatFrontDto(chatData: CreatedNewChatDtoFromBd): CreatedChatDtoToFront {

	const members = chatData.member.map((member) => {
		return {
			userId: member.userId,
			name: member.user.name
		};
	});

	return {
		chatId: chatData.chatId,
		ownerId: chatData.ownerId,
		chatType: chatData.chatType as ChatTypes,
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

export function getChatToFront(chatData: ChatDtoFromBd, userId: string): ChatDtoToFront {
	return {
		chatId: chatData.chatId,
		chatType: chatData.chatType as ChatTypes,
		ownerId: chatData.ownerId,
		members: chatData.member.reduce((acc, cur) => {
			if (cur.userId === userId) {
				return acc;
			} else {
				acc.push({ userId: cur.userId, name: cur.user.name })
			}
			return acc;
		}, [])

	}
}