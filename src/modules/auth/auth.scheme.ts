import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const checkLoginScheme = z.object({
    login: z
        .string({
            required_error: 'Login is required field',
            invalid_type_error: 'Login must be string'
        })
        .trim()
        .min(1, {
            message: 'Password must be more 5 symbols'
        })
})


const loginScheme = checkLoginScheme.extend({
    password: z
        .string({
            required_error: 'Password is required field',
            invalid_type_error: 'Password must be string'
        })
        .trim()
        .min(5, {
            message: 'Password must be more 5 symbols'
        })
})


const registrationScheme = loginScheme.extend({
    name: z
        .string({
            required_error: 'Name is required field',
            invalid_type_error: 'Name must be string'
        })
        .trim()
        .min(1, {
            message: 'Password must be more 5 symbols'
        }),
})


const loginResponseScheme = z.object({
    user_id: z.string({}).uuid(),
    token: z.string({}),
})

const registrationResponseScheme = z.object({
    user_id: z.string().uuid(),
    token: z.string(),
})

const checkLoginResponseScheme = z.object({
    result: z.boolean()
})

const refreshTokenResponse = z.object({
    token: z.string({}),
})


const responseErrorScheme = z.object({
    error: z.string(),
    statusCode: z.number(),
    message: z.string()
})



export type UserLoginScheme = z.infer<typeof loginScheme>
export type UserRegistrationScheme = z.infer<typeof registrationScheme>
export type CheckLoginScheme = z.infer<typeof checkLoginScheme>

export type UserLoginResponceScheme = z.infer<typeof loginResponseScheme>
export type UserRegistrationResponceScheme = z.infer<typeof registrationResponseScheme>
export type CheckLoginResponceScheme = z.infer<typeof checkLoginResponseScheme>

export type ErrorResponceScheme = z.infer<typeof responseErrorScheme>

export const { schemas: authSchemes, $ref } = buildJsonSchemas({
    checkLoginScheme,
    loginScheme,
    registrationScheme,

    loginResponseScheme,
    registrationResponseScheme,
    checkLoginResponseScheme,
    refreshTokenResponse,
    responseErrorScheme
    
}, { $id: 'auth' })


