export const AuthErrors = {
	busyLogin: new Error('Такой логин уже используется'),
	userNotExist: new Error('Пользователя не существует'),
	wrongAuthData: new Error('Неверная связка логин/пароль' ),
};