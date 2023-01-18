import { FastifyReply } from 'fastify';
import { getProfile } from './profile.repositories';

class ProfileService {
	async getProfile(user_id: string, reply: FastifyReply) {

		const profile = await getProfile(user_id);
		reply.send(profile);

	}
}

export default new ProfileService();