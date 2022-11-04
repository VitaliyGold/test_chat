import { authSchemes } from "../modules/auth/auth.scheme";
import { chatsScheme } from "../modules/chats/chats.schemes";

export function getSchemesCollections() {
    return [
        ...authSchemes,
        ...chatsScheme
    ]
} 

