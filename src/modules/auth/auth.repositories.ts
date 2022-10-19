import { PostgresDb } from '@fastify/postgres';
import { RegistrationModel } from '../../types/auth';

export async function getUserToLogin(bd: PostgresDb, user_login: string):  {
    const { rows } = await bd.query(
        `SELECT login FROM auth_data WHERE login=$1`, [user_login]
    )
    if (rows.length) {
        return rows
    }
    return null
}



export async function createNewUser(bd: PostgresDb, user_data: RegistrationModel) {
    return await bd.transact(async bd => {
        await bd.query('INSERT INTO auth_data (login, password, user_id) VALUES ($1, $2, $3) RETURNING id', [user_data.login, user_data.password, user_data.user_id])
        await bd.query('INSERT INTO user_data (name, user_id) VALUES ($1, $2) RETURNING id', [user_data.name, user_data.user_id])
        return user_data.user_id
    })
}