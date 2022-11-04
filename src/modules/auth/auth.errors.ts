export const AuthErrors = {
    busy_login: new Error('Такой логин уже используется'),
    user_not_exist: new Error('Пользователя не существует'),
    wrong_auth_data: new Error('Неверная связка логин/пароль' ),
}