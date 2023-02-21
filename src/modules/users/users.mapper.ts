import { UserWithChatFromBd, UserWithChatsToFront } from './users.types';


// помечаем есть ли у текущего пользователя чат с данным пользователем
export const mapUsersList = (userId: string, usersList: UserWithChatFromBd[]): UserWithChatsToFront[] => {
    const usersWithChats = [] as UserWithChatsToFront[];

    for (const user of usersList) {

        const chatId = user.chatsMembersList.length ? user.chatsMembersList[0].chatId : null;

        usersWithChats.push({
            userId: user.userId,
            name: user.name,
            haveChat: !!user.chatsMembersList.length,
            chatId,
            userDescription: user.userDescription
        });
    }

    return usersWithChats;
}