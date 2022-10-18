export function loadEnv(key: string) {
    const val = process.env[key];

    if (!val) {
        throw new Error(`key ${key} is a required env variable`)
    } 
    return val;
}