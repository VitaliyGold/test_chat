import { FastifyInstance } from "fastify";
import { getTokensFromBlackList } from "../modules/auth/auth.repositories";


const TokenBlackListHook = async (fastify: FastifyInstance, done: (err?: Error) => void) => {

    try {
        const tokens = await getTokensFromBlackList();
        fastify.tokensBlackList = new Set(tokens.map(token => token.token));

    } catch(e) {
        throw new Error('Ошибка при загрузке черного списка токенов');
    }
    done()
    
}

export default TokenBlackListHook;