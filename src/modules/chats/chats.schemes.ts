import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';



const chatScheme = z.object({
	message: z
		.string({
			requiredError: 'Login is required field',
			invalidTypeError: 'Login must be string'
		}),
    
});


export type ChatUserScheme = z.infer<typeof chatScheme>

export const { schemas: chatsScheme, $ref } = buildJsonSchemas({
	chatScheme,  
}, { $id: 'chats' });


