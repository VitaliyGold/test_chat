import ProfileService from './profile.service';
import { GetProfile } from './profile.types';
import { FastifyReply, FastifyRequest } from 'fastify';

class ProfileController {
    
	getUserProfileHandler(request: GetProfile, reply: FastifyReply) {

		const { userId } = request.user;

		const { profileId } = request.query;

		return ProfileService.getProfile(userId, profileId, reply);

	}

	editUserProfileHandler(request: FastifyRequest, reply: FastifyReply) {
		return {};
	}
}

export default new ProfileController();