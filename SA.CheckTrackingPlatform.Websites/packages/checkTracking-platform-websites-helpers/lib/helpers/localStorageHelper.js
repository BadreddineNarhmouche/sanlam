import { GeneralHelper } from "./GeneralHelpers";
const isAvailable = () => {
    try {
        if (typeof (Storage) !== "undefined") {
            let x = '__localStorage__test__';
            add(x, x);
            remove(x);
            return true;
        }
        return false;
    }
    catch {
        return false;
    }
};
const add = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
const update = (key, value) => {
    remove(key);
    add(key, value);
};
const remove = (key) => {
    if (contains(key)) {
        localStorage.removeItem(key);
    }
};
const get = (key) => {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
};
const contains = (key) => {
    return GeneralHelper.isObjectNotNull(get(key));
};
const clear = () => {
    localStorage.clear();
};
export const LocalStorageHelper = {
    isAvailable,
    add,
    update,
    remove,
    get,
    contains,
    clear
};
//# sourceMappingURL=localStorageHelper.js.map