import prisma from '../../utils/prisma';
import { CreateChatDto } from './chats.types';

export async function getChatForId(chatId: string) {
	return prisma.chatsData.findUnique({
		where: {
			chatId: chatId
		},
		select: {
			id: false,
			createdAt: false,
			chatId: true,
			chatType: true,
			ownerId: true,
			member: {
				select: {
					userId: true,
					user: {
						select: {
							name: true
						}
					}
				}
			},
		},
	});
}

export async function createNewChat(chatInfo: CreateChatDto) {
	try {
		return await prisma.chatsData.create({
			data: {
				chatId: chatInfo.chatId,
				chatType: chatInfo.chatType,
				ownerId: chatInfo.ownerId,
				member: {
					createMany: {
						data: [
							{ userId: chatInfo.members[0] },
                                
							{ userId: chatInfo.members[1] }
						]
					}
				},
				messages: {
					create: [
						{ 
							messageId: chatInfo.firstMessageId,
							ownerId: chatInfo.ownerId,
							messageText: chatInfo.startMessage
						}
					],
				},
			},
			select: {
				id: false,
				chatType: false,
				chatId: true,
				createdAt: true,
				ownerId: true,
				member: {
					select: {
						userId: true,
						user: {
							select: {
								name: true
							}
						}
					}
				},
				messages: {
					select: {
						messageId: true,
						ownerId: true,
						createdAt: true,
						messageText: true,
						owner: {
							select: {
								name: true
							}
						}
					}
				}
			}
		});
	} catch(e) {
		return e;
	}
    
}

export async function getChatListForUserId(userId: string) {
	try {
		return await prisma.chatsMembersData.findMany({
			where: {
				userId: userId,
			},
			include: {
				chat: {
					include: {
						messages: {
							orderBy: {
								createdAt: 'desc'
							},
							take: 1
                            
						}
					}
				},
				user: {
					select: {
						name: true
					}
				},
                
			}
		});
	} catch(e) {
		return e;
	}
    
}

export function getChatMembers(chatId: string) {
	return prisma.chatsMembersData.findMany({
		where: {
			chatId: chatId
		},
		select: {
			chatId: true,
			userId: true,
			user: {
				select: {
					avatarLink: true,
					name: true
				}
			}
		}
	})
}

export async function getChatForMemberIds(memberIds: string[]) {
	try {
		return prisma.chatsData.findFirst({
			where: {
				member: {
					every: {
						userId: {
							in: memberIds
						}
					}
				}
			}
		});
	} catch(e) {
		console.log(e);
	}
}
