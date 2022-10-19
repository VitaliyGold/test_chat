type lengthValidateArg = [string, number]

export function validateLength( validateData: lengthValidateArg[] ):boolean {
    for (let i = 0; i < validateData.length; i++) {
        if (!validateData[i][0] || validateData[i][0].length < validateData[i][1]) {
            return false
        }
    }
    return true
}