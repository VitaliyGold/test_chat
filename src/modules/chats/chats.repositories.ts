import { PostgresDb } from '@fastify/postgres';
import { QueryResult } from 'pg';
import { ChatDto } from '../../types/chats';
import { MessageDto } from 'src/types/messages';

export async function createNewChat(bd: PostgresDb, chat_info: ChatDto, message_info: MessageDto): Promise<void> {

    const { chat_id, members_table_id } = chat_info;
    return await bd.transact(async client => {
        await client.query(`INSERT INTO messages_table
            (text_message, owner_id, chat_id, message_id, watched, message_type, time_send) VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
            [
                message_info.text_message, message_info.owner_id, message_info.chat_id, 
                message_info.message_id, message_info.watched, message_info.message_type,
                message_info.time_send
            ]
        )
        await client.query(`INSERT INTO chats_table
            (chat_type, owner_id, chat_name, chat_id, members_table_id) VALUES ($1, $2, $3, $4, $5)`, 
            [chat_info.chat_type, chat_info.owner_id, chat_info.chat_name, chat_info.chat_id, chat_info.members_table_id]
        )
        await client.query(`INSERT INTO chats_users_table
            (chat_id, user_id) VALUES ($1, $2, $3, $4, $5)`, 
            [chat_info.chat_type, chat_info.owner_id, chat_info.chat_name, chat_info.chat_id, chat_info.members_table_id]
        )
    })
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