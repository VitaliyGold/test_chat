import UsersService from './users.service';
import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify';
//import {  } from './types';

class UserController {
    async getUsers(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
        return UsersService.getUsers(request, reply)
    }

   
}

export default new UserController()