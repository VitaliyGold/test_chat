import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const loginScheme = z.object({
    login: z
        .string({
            required_error: 'Login is required field',
            invalid_type_error: 'Login must be string'
        }),
    password: z
        .string({
            required_error: 'Password is required field',
            invalid_type_error: 'Password must be string'
        })
        .length(5, {
            message: 'Password must be more 5 symbols'
        })
})


const registrationScheme = z.object({
    name: z
        .string({
            required_error: 'Name is required field',
            invalid_type_error: 'Name must be string'
        }),
    login: z
        .string({
            required_error: 'Login is required field',
            invalid_type_error: 'Login must be string'
        }),
    password: z
        .string({
            required_error: 'Password is required field',
            invalid_type_error: 'Password must be string'
        })
        .length(5, {
            message: 'Password must be more 5 symbols'
        })
})

const loginResponseScheme = z.object({
    user_id: z.string({}).uuid(),
    token: z.string({}),
})

const registrationResponseScheme = z.object({
    user_id: z.string().uuid(),
    token: z.string(),
})

const registrationResponseErrorScheme = z.object({
    error: z.boolean(),
    message: z.string()
})

export type UserLoginScheme = z.infer<typeof loginScheme>
export type UserRegistrationScheme = z.infer<typeof registrationScheme>

export type UserLoginResponceScheme = z.infer<typeof loginResponseScheme>
export type UserRegistrationResponceScheme = z.infer<typeof registrationResponseScheme>

export const { schemas: authSchemes, $ref } = buildJsonSchemas({
    loginScheme,
    registrationScheme,
    loginResponseScheme,
    registrationResponseScheme,
    registrationResponseErrorScheme
})


