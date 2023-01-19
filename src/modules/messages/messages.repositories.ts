import prisma from '../../utils/prisma';
import { MessageDto } from './messages.types';


// тут нужно добавить тип возвращаемого объекта
export async function sendMessage(message: MessageDto) {
	return prisma.messagesData.create({
		data: {
			chatId: message.chatId,
			ownerId: message.ownerId,
			messageText: message.messageText
		}
	});
}


export async function getMessageList(chatId: string, skipNumber: number) {

	try {
		return prisma.messagesData.findMany({
			where: {
				chatId: chatId
			},
			take: 50,
			skip: skipNumber,
   
		});
	} catch(e) {
		console.log(e);
	}
    
}