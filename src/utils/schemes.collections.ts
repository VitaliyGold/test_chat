import { authSchemes } from "../modules/auth/auth.scheme";

export function getSchemesCollections() {
    return [
        ...authSchemes
    ]
} 

