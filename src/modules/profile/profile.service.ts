import { FastifyReply } from 'fastify';
import { getProfile } from './profile.repositories';

class ProfileService {
	async getProfile(userId, reply: FastifyReply) {

		const profile = await getProfile(userId);
		reply.send(profile);

	}
}

export default new ProfileService();