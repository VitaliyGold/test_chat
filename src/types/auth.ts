import { FastifyRequest, FastifyReply } from 'fastify';

export type RegistrationRequest = FastifyRequest<{
    Body: { 
        login: string,
        password: string
     };
  }>