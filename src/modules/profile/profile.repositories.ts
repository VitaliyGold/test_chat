import prisma from '../../utils/prisma';

export function getProfile(userId) {
	return prisma.profileData.findUnique({
		where: {
			userId
		},
		select: {
			name: true,
			userId: true,
			userLink: true,
			avatarLink: true
		}
	});
}