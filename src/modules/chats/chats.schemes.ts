import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';



const chatScheme = z.object({
	message: z
		.string({
			required_error: 'Login is required field',
			invalid_type_error: 'Login must be string'
		}),
    
});


export type ChatUserScheme = z.infer<typeof chatScheme>

export const { schemas: chatsScheme, $ref } = buildJsonSchemas({
	chatScheme,  
}, { $id: 'chats' });


