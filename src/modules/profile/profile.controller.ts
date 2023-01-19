import ProfileService from './profile.service';
import { GetProfile } from './profile.types';
import { FastifyReply, FastifyRequest } from 'fastify';

class ProfileController {
    
	getUserProfileHandler(request: GetProfile, reply: FastifyReply) {

		const { userId } = request.user;

		return ProfileService.getProfile(userId, reply);

	}

	editUserProfileHandler(request: FastifyRequest, reply: FastifyReply) {
		return {};
	}
}

export default new ProfileController();