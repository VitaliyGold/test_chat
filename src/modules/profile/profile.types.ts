import { AuthRequestParams } from '../auth/types';
import { FastifyRequest } from 'fastify';

export type GetProfile = FastifyRequest & AuthRequestParams;