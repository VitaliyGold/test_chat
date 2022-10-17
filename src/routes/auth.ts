import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

type CustomRequest = FastifyRequest<{
    Body: { 
        login: string,
        password: string
     };
  }>


const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/auth/registration', async function(request: CustomRequest, reply: FastifyReply) {

        const { login, password } = request.body
        const client = await fastify.pg.connect()
        
        const user_id = uuidv4()

        try {
            const { rows } = await client.query(
                'INSERT INTO public.auth_data (user_id, login, password) VALUES($1, $2, $3)', [user_id, login, password],
            )
            console.log(rows)
            return {
                root: true
            }
        } catch(e) {
            console.log(e)
             client.release()
            return {
                error: true
            }
        }
        
    })
}

export default authRoute;