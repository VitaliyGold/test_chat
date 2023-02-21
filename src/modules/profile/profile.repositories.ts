import prisma from '../../utils/prisma';

export function getProfile(userId: string) {
	return prisma.profileData.findUnique({
		where: {
			userId
		},
		select: {
			name: true,
			userId: true,
			userLink: true,
			avatarLink: true,
			userDescription: true,
			chatsMembersList: {
				where: {
					chat: {
						member: {
							some: {
								userId,
							},
						}
					}
				},
				select: {
					id: false,
					chatId: true,
					userId: true
				}
                
			},
		}
	});
}