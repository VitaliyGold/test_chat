import { FastifyReply } from 'fastify';
import { getProfile } from './profile.repositories';
import { checkUUID } from '../../helpers/helpers';
import { mapProfileToFront } from './profile.mappers';

class ProfileService {
	async getProfile(userId: string, profileId: string, reply: FastifyReply) {

		// userId пока оставляем, возможно потом потребуется менять запрос в зависимости от
		// доступов пользователя (на запрос своего профиля будет приходить больше полей)

		if (!checkUUID(profileId)) {
			this.sendProfileError(reply);
			return;
		}

		const profile = await getProfile(profileId);
		if (!profile) {
			this.sendProfileError(reply);
			return;
		} 
		reply.send(mapProfileToFront(profile));

		

	}

	private sendProfileError(reply: FastifyReply) {
		reply.status(400).send({
			error: 'incorrect profileId',
			statusCode: 400,
			message: 'Некорректный id профиля',
		})
	}
}

export default new ProfileService();