export declare const LocalStorageHelper: {
    isAvailable: () => boolean;
    add: (key: any, value: any) => void;
    update: (key: any, value: any) => void;
    remove: (key: any) => void;
    get: (key: any) => any;
    contains: (key: any) => boolean;
    clear: () => void;
};
