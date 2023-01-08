import { FastifyPluginAsync } from 'fastify';
import ProfileController from '../../modules/profile/profile.controller';

const profileRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/getUserProfile', ProfileController.getUserProfileHandler);

    fastify.post('/editProfile', ProfileController.editUserProfileHandler)
    
}

export default profileRoutes;