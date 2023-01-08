import ProfileService from './profile.service';
import { GetProfile } from './profile.types';
import { FastifyReply, FastifyRequest } from 'fastify';

class ProfileController {
    
    getUserProfileHandler(request: GetProfile, reply: FastifyReply) {

        const { user_id } = request.user;

        return ProfileService.getProfile(user_id, reply);

    }

    editUserProfileHandler(request: FastifyRequest, reply: FastifyReply) {
        return {}
    }
}

export default new ProfileController();