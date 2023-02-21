export function loadEnv(key: string) {
	const val = process.env[key];

	if (!val) {
		throw new Error(`key ${key} is a required env variable`);
	} 
	return val;
}

type lengthValidateArg = [string, number]

export function validateLength( validateData: lengthValidateArg[] ):boolean {
	for (let i = 0; i < validateData.length; i++) {
		if (!validateData[i][0] || validateData[i][0].length < validateData[i][1]) {
			return false;
		}
	}
	return true;
}


// вот эту хуйню заменить после нормальной схемой и валидацией на уровне запроса
export function checkUUID(value: string) {
	if (value && typeof value === 'string') {
		console.log(121)
		return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value);
	}
	return false;
}
