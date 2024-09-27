export const enumToArray = (enumObj: any): string[] => {
    return Object.values(enumObj).filter((value) => typeof value === 'string');
};