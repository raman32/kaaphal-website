export function parseFullName(firstName: string, middleName?: string, lastName?: string): string {
    return firstName + (middleName ? ' ' + middleName : '' + (lastName ? ' ' + lastName : ''))
}