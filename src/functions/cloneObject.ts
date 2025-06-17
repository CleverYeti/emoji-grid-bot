export function cloneObject<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    const res: any = Array
        .isArray(obj) ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            res[key] = cloneObject(obj[key]);
        }
    }
    return Object.assign(res, obj) as T;
}