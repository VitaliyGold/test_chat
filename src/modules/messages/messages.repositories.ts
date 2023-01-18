import prisma from '../../utils/prisma';
import { MessageDto } from './messages.types';


// тут нужно добавить тип возвращаемого объекта
export async function sendMessage(message: MessageDto) {
	return prisma.messages_data.create({
		data: {
			chat_id: message.chat_id,
			owner_id: message.owner_id,
			message_text: message.message_text
		}
	});
}


export async function getMessageList(chatId: string, skipNumber: number) {

	try {
		return prisma.messages_data.findMany({
			where: {
				chat_id: chatId
			},
			take: 50,
			skip: skipNumber,
   
		});
	} catch(e) {
		console.log(e);
	}
    
}