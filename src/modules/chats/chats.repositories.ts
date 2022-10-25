import { PostgresDb } from '@fastify/postgres';
import { QueryResult } from 'pg';
import { ChatDto } from '../../types/chats';

export async function getUserById(bd: PostgresDb, user_id: string): Promise<ChatDto | null> {
    const { rows }: QueryResult<ChatDto> = await bd.query(
        `SELECT *
        FROM chats_data
        WHERE owner_id=$1`, 
        [user_id]
    );
    if (rows.length) {
        return rows[0];
    }
    return null;
}

export async function createNewChat(bd: PostgresDb, chat_info: ChatDto,): Promise<ChatDto | null> {
    const { rows }: QueryResult<ChatDto> = await bd.query(
        `INSERT *
        FROM chats_data
        WHERE owner_id=$1`, 
        [user_id]
    );
    if (rows.length) {
        return rows[0];
    }
    return null;
}

export async function changeChat(bd: PostgresDb, user_id: string): Promise<ChatDto | null> {
    const { rows }: QueryResult<ChatDto> = await bd.query(
        `SELECT *
        FROM chats_data
        WHERE owner_id=$1`, 
        [user_id]
    );
    if (rows.length) {
        return rows[0];
    }
    return null;
}