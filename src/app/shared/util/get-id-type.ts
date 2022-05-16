export function getIdType(type: boolean): string {
    if (type) {
        return 'RSAID';
    }
    return 'PASSPORT';
}
