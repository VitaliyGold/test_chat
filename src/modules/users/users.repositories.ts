import prisma from '../../utils/prisma';

export async function getUserProfileById(id: string) {
	return prisma.profileData.findUnique({
		where: {
			userId: id
		},
		select: {
			name: true,
			userId: true,
			chatsData: {
				select: {
					chatId: true
				}
			}
		}
	});
}


export async function getUsersList(name: string, from = 0, count = 50, userId) {
	return prisma.profileData.findMany({
		where: {
			name: {
				contains: name,
				mode: 'insensitive'
			},
		},
		select: {
			name: true,
			userId: true,
			chatsMembersList: {
				where: {
					chat: {
						member: {
							some: {
								userId
							}
						}
					}
				}
                
			},
		},
        
		skip: from, 
		take: count
        
	});
}