import { ProfileFromBd, ProfileToFront } from "./profile.types"

export const mapProfileToFront = (profile: ProfileFromBd): ProfileToFront => {

    const chatId = profile.chatsMembersList.length ? profile.chatsMembersList[0].chatId : null;

    return {
        userId: profile.userId,
        userDescription: profile.userDescription,
        userLink: profile.userLink,
        avatarLink: profile.avatarLink,
        name: profile.name,
        chatId: chatId,
        haveChat: !!chatId
    }
}