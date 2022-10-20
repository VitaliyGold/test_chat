import { PostgresDb } from '@fastify/postgres';
import { RegistrationModel, UserModel } from '../../types/auth';
import { QueryResult } from 'pg';

export async function checkUseLogin(bd: PostgresDb, user_login: string): Promise<boolean> {
    const { rows } = await bd.query(
        `SELECT login FROM auth_data WHERE login=$1 LIMIT 1`, [user_login]
    );
    if (rows.length) {
        return true;
    }
    return false;
}

export async function getUserData(bd: PostgresDb, user_login: string): Promise<UserModel | null> {
    const { rows }: QueryResult<UserModel> = await bd.query(
        `SELECT auth_data.login, auth_data.user_id, auth_data.password, user_data.name
        FROM auth_data
        FULL JOIN user_data on user_data.user_id = auth_data.user_id
        WHERE login=$1`, 
        [user_login]
    );
    if (rows.length) {
        return rows[0];
    }
    return null;
}



export async function createNewUser(bd: PostgresDb, user_data: RegistrationModel): Promise<string> {
    return await bd.transact(async bd => {
        await bd.query('INSERT INTO auth_data (login, password, user_id) VALUES ($1, $2, $3) RETURNING id', [user_data.login, user_data.password, user_data.user_id])
        await bd.query('INSERT INTO user_data (name, user_id) VALUES ($1, $2) RETURNING id', [user_data.name, user_data.user_id])
        return user_data.user_id
    });
}