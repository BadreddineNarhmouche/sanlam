export interface RequestOptions {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    headers: HeadersInit;
    body?: string;
}
export interface ResponseError extends Error {
    message: string;
    response: {
        status: number;
        statusText: string;
        json: () => Promise<any>;
    };
}
interface HandlerProps {
    apiPath: string;
    baseApiPath: string | undefined;
    requestOptions?: any;
    dispatchSuccess?: any;
    dispatchFailure?: any;
    defaultEndCallApiSuccess?: any;
    defaultEndCallApiFailure?: any;
    offlineMode?: boolean;
    offlineCall?: (data?: any) => any;
    mapper?: (data: any) => any;
    successCallback?: any;
}
export declare function requestWithAuth(url: string, baseApiPath: any, options: RequestOptions, parseJson?: boolean): Promise<any>;
export declare const request: (baseApiPath: string, url: string, options: RequestOptions, parseJson?: boolean) => Promise<any>;
export declare const getApiBasePath: () => any;
export declare const checkStatus: (response: Response) => Response;
export declare const parseJSON: (response: Response) => Promise<any> | Response;
export declare function handleError(error: ResponseError): Generator<Promise<any>, any, any>;
export declare function callApi({ apiPath, baseApiPath, defaultDataValue, requestOptions, callbackParameters, callbackAction, formatData, receiveBadResponse, }: {
    apiPath: string;
    baseApiPath: string | undefined;
    defaultDataValue: string | object | undefined;
    requestOptions?: any;
    callbackParameters?: any;
    callbackAction?: (...args: any) => any;
    formatData?: (data: any) => any;
    receiveBadResponse?: boolean;
}): Generator<Promise<any> | import("redux-saga/effects").CallEffect<any> | import("redux-saga/effects").PutEffect<any>, {
    meta?: any;
    success: boolean;
    data: any;
}, any>;
export declare const createDataSlice: (label: string, initialState: any) => import("@reduxjs/toolkit").Slice<any, {
    getAll: (state: any) => void;
    getAllByCriteria: (state: any, action: {
        payload: any;
        type: string;
    }) => void;
    getBy: (state: any, action: {
        payload: any;
        type: string;
    }) => void;
    create: (state: any, action: {
        payload: any;
        type: string;
    }) => void;
    update: (state: any, action: {
        payload: any;
        type: string;
    }) => void;
    delete: (state: any, action: {
        payload: any;
        type: string;
    }) => void;
    callApiSuccess: (state: any, action: {
        payload: any;
        type: string;
    }) => void;
    callApiFailure: (state: any, action: {
        payload: any;
        type: string;
    }) => void;
    defaultEndCallApiSuccess: (state: any) => void;
    defaultEndCallApiFailure: (state: any, action: {
        payload: any;
        type: string;
    }) => void;
    clear: (state: any) => void;
}, string>;
export declare function apiCallHandler({ apiPath, baseApiPath, requestOptions, dispatchSuccess, dispatchFailure, defaultEndCallApiSuccess, defaultEndCallApiFailure, offlineMode, offlineCall, mapper, successCallback, }: HandlerProps): any;
export declare const requestUtils: {
    getApiBasePath: () => any;
    request: (baseApiPath: string, url: string, options: RequestOptions, parseJson?: boolean) => Promise<any>;
    checkStatus: (response: Response) => Response;
    parseJSON: (response: Response) => Promise<any> | Response;
};
export {};
