import { FastifyPluginAsync } from 'fastify';

const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/auth/login', async function(request, reply) {

        fastify.pg.connect(onConnect)
        console.log(1234)
        function onConnect (err, client) {
            if (err) {
                console.log(err)
                return
            }

            client.query(
                'select all from users',
                function onResult (err, result) {
                    console.log(err)
                    console.log(result)
                }
            )
        }
        return {
            root: true
        }
    })
}

export default authRoute;