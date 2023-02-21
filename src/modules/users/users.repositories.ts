import prisma from '../../utils/prisma';

export async function getUserProfileById(userId: string) {
	console.log(userId)
	return prisma.profileData.findUnique({
		where: {
			userId
		},
		select: {
			name: true,
			userId: true,
			userDescription: true,
			chatsData: {
				select: {
					chatId: true,
				}
			}
		}
	});
};


export async function getUsersList(name: string, from = 0, count = 50, userId: string) {
	return prisma.profileData.findMany({
		where: {
			name: {
				contains: name,
				mode: 'insensitive'
			},
			NOT: {
				userId
			}
		},
		select: {
			name: true,
			userId: true,
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
		},
        
		skip: from, 
		take: count
        
	});
}