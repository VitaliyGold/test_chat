import { FastifyInstance } from 'fastify';

const TokensBlackListPlugin = (fastify: FastifyInstance, _: any, next: Function) => {
    fastify.decorate('tokensBlackList', () => {
      fastify.tokensBlackList = new Set();
    });
  
    next();
  };

export default TokensBlackListPlugin;