import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";

const AutorizationHook = (fastify: FastifyInstance, req: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) => {
    
    try {
        const url = req.url.split('/');
        if (url[2].includes('ws')) {

            const token = url[2].split('Bearer%20')[1];
            // @ts-ignore
            const { userId } = fastify.jwt.verify(token);
            req.user = { userId };
        // возможно в последствии заменю эту срань на хуки для каждой ручки, где нужна авторизация, но не сегодня
        } else if (url[3] === 'logout' || url[2] !== 'auth') {
            
            const token = req.headers.authorization.split(' ')[1];
            // @ts-ignore
            const { userId } = fastify.jwt.verify(token);
            req.user = { userId };
        }
    } catch(e) {
        reply.code(401).send({ message: 'Invalid Auth' });
    }
    done()
    
}

export default AutorizationHook;