import { PostgresDb } from '@fastify/postgres';
import { User } from 'src/types/user';
import { QueryResult } from 'pg';

export async function getUserById(bd: PostgresDb, user_id: string): Promise<User | null> {
    const { rows }: QueryResult<User> = await bd.query(
        `SELECT auth_data.login, user_data.name
        FROM auth_data
        FULL JOIN user_data on user_data.user_id = $1
        WHERE auth_data.user_id=$1`, 
        [user_id]
    );
    if (rows.length) {
        return rows[0];
    }
    return null;
}