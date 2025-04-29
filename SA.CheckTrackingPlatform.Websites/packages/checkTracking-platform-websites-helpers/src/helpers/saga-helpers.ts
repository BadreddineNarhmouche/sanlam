/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import * as httpStatus from 'http-status';
import fetch from 'isomorphic-fetch';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../services/authentication';

const defaultRequestOptions: RequestOptions = {
  method: 'GET',
  headers: {},
};
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

function isGeneratorFunction(func) {
  const constructor = func.constructor;
  if (!constructor) return false;
  if (
    constructor.name === 'GeneratorFunction' ||
    constructor.displayName === 'GeneratorFunction'
  ) {
    return true;
  }
  return false;
}

export function requestWithAuth(
  url: string,
  baseApiPath: any,
  options: RequestOptions,
  parseJson = true,
) {
  const optionsWithAuth: RequestOptions = {
    ...options,
    headers: {
      ...options.headers,
    },
  };

  return requestUtils.request(baseApiPath, url, optionsWithAuth, parseJson);
}

// abstracts away some of the complexity of making network requests using the fetch()
export const request = (
  baseApiPath: string,
  url: string,
  options: RequestOptions,
  parseJson = true,
) => {
  const fetchOperation = () =>
    fetch(`${baseApiPath}${url}`, options)
      .then(checkStatus)
      .then((response) => {
        return parseJson ? requestUtils.parseJSON(response) : response;
      });

  return UserService.updateToken(fetchOperation);
};

// returns the base URL for the API based on the current environment
export const getApiBasePath = (): any => {
  return process.env.REACT_APP_API_REFERENTIAL_BASE_PATH; //TO CHANGE dynamically
};

export const checkStatus = (response: Response): Response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText) as ResponseError;
  error.response = response;
  throw error;
};

export const parseJSON = (response: Response): Promise<any> | Response => {
  return response.status === 204 ? response : response.json();
};

// handle errors that occur during network requests in a Redux-saga,
// display a toast error message to the user.
// handles certain types of errors, such as authentication and authorization errors,
// by logging the user out and clearing their data.
export function* handleError(error: ResponseError) {
  let displayedError;
  let errorResponse = error.response;
  if (errorResponse) {
    let jsonResponse;

    try {
      jsonResponse = yield errorResponse.json();
    } catch (err) {
      jsonResponse = errorResponse;
    }

    displayedError =
      get(jsonResponse, ['data', 'error', 'response', 'Message']) ||
      get(jsonResponse, ['data', 'error', 'response', 'message']) ||
      get(jsonResponse, ['data', 'error', 'response', 'message', 'Message']) ||
      get(jsonResponse, ['data', 'error', 'stack']) ||
      get(jsonResponse, ['data', 'error', 'message']) ||
      get(jsonResponse, ['data', 'message']) ||
      get(jsonResponse, ['statusText']) ||
      get(jsonResponse, ['message']) ||
      'error.general_error';
    if (
      jsonResponse &&
      (jsonResponse.statusCode === 401 ||
        jsonResponse.statusCode === 403 ||
        jsonResponse.status === 401 ||
        jsonResponse.status === 403)
    ) {
      const k = (window as any).keycloak;
      if (k && k.logout) {
        k.logout();
      }
      localStorage.clear();
      // loginDataStorageService.clearLoginData();
    }
    if ([httpStatus['401'], httpStatus['403']].includes(displayedError)) {
      displayedError = console.log('error.unpermitted_access');
    }
  } else {
    displayedError = console.log('error.general_error');
  }

  return displayedError || errorResponse || error;
}

/* istanbul ignore next */
export function* callApi({
  apiPath,
  baseApiPath,
  defaultDataValue,
  requestOptions = {},
  callbackParameters = [],
  callbackAction,
  formatData,
  receiveBadResponse = false,
}: {
  apiPath: string;
  baseApiPath: string | undefined;
  defaultDataValue: string | object | undefined;
  requestOptions?: any;
  callbackParameters?: any;
  callbackAction?: (...args: any) => any;
  formatData?: (data: any) => any;
  receiveBadResponse?: boolean;
}) {
  let errorResponse;
  let formattedData;
  try {
    let rawData;
    if (apiPath) {
      const token = UserService.getToken();
      try {
        if (!requestOptions.hasOwnProperty('headers')) {
          requestOptions.headers = {};
        }
        requestOptions.headers = {
          ...requestOptions.headers,
          ...{ Authorization: 'Bearer ' + token },
          ...(requestOptions.contentType !== 'multipart/form-data' && {
            'Content-Type': 'application/json',
          }),
        };
        const apiRequestCall = call(requestWithAuth, apiPath, baseApiPath, {
          ...defaultRequestOptions,
          ...(requestOptions as RequestOptions),
        });
        rawData = yield apiRequestCall;
      } catch (err) {
        errorResponse = yield* handleError(err);
        rawData = { data: defaultDataValue };
      }
    } else {
      rawData = defaultDataValue;
    }
    if (!(errorResponse && receiveBadResponse)) {
      try {
        formattedData = formatData != null ? formatData(rawData) : rawData;

        if (callbackAction != null) {
          if (callbackParameters.length > 0) {
            const parameters = formattedData
              ? [...callbackParameters, formattedData]
              : callbackParameters;
            yield put(callbackAction(...parameters));
          } else {
            yield put(callbackAction(formattedData));
          }
        }
      } catch (err) {
        errorResponse = yield* handleError(err);
      }
    }
  } catch (err) {
    errorResponse = yield* handleError(err);
  }

  return errorResponse ||
    (!formattedData?.isSuccess && formattedData.message !== 'OK')
    ? { success: false, data: errorResponse || formattedData?.WarningMessage }
    : {
      success: true,
      data: formattedData?.data || null,
      ...(formattedData?.totalCount &&
        formattedData?.itemsCount &&
        formattedData?.pageSize &&
        formattedData?.pageIndex &&
        formattedData?.pageCount
        ? {
          meta: {
            itemsCount: formattedData?.itemsCount || 0,
            totalCount: formattedData?.totalCount || 0,
            pageIndex: formattedData?.pageIndex || 1,
            pageSize: formattedData?.pageSize || 0,
            pageCount: formattedData?.pageCount || 0,
            ...(formattedData?.unseenCount && {
              unseenCount: formattedData?.unseenCount || 0,
            }),
          },
        }
        : {}),
    };
}

export const createDataSlice = (label: string, initialState: any) => {
  return createSlice({
    name: label,
    initialState,
    reducers: {
      getAll: (state) => {
        state.isLoading = true;
      },
      getAllByCriteria: (state, action) => {
        state.isLoading = true;
      },
      getBy: (state, action) => {
        state.isLoading = true;
      },
      create: (state, action) => {
        state.isLoading = true;
      },
      update: (state, action) => {
        state.isLoading = true;
      },
      delete: (state, action) => {
        state.isLoading = true;
      },
      callApiSuccess: (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.responseData = action.payload.data;
        if (action.payload.meta) {
          state.meta = {
            itemsCount: action.payload.meta.itemsCount,
            totalCount: action.payload.meta.totalCount,
            pageIndex: action.payload.meta.pageIndex,
            pageSize: action.payload.meta.pageSize,
            pageCount: action.payload.meta.pageCount,
            ...(action.payload.meta.unseenCount && {
              unseenCount: action.payload.meta.unseenCount,
            }),
          };
        }
      },
      callApiFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload || true;
      },
      defaultEndCallApiSuccess: (state) => {
        state.isLoading = false;
        state.error = false;
      },
      defaultEndCallApiFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload || true;
      },
      clear: (state) => {
        state.isLoading = false;
        state.error = null;
        state.responseData = [];
        state.meta = null;
      },
    },
  });
};

export function* apiCallHandler({
  apiPath,
  baseApiPath,
  requestOptions,
  dispatchSuccess,
  dispatchFailure,
  defaultEndCallApiSuccess,
  defaultEndCallApiFailure,
  offlineMode,
  offlineCall,
  mapper,
  successCallback,
}: HandlerProps): any {
  const isFormData = requestOptions?.contentType === 'multipart/form-data';
  if (isFormData) {
    requestOptions.body.append('CallingChannelCode', process.env.REACT_APP_CHANNEL_CODE);
    requestOptions.body.append('CallerId', uuidv4());
  }
  const { data, meta, success } =
    offlineMode && offlineCall
      ? {
        data: offlineCall(),
        meta: {
          itemsCount: 0,
          totalCount: 0,
          pageIndex: 1,
          pageSize: 0,
          pageCount: 0,
          unseenCount: 0,
        },
        success: true,
      }
      : yield call(() =>
        callApi({
          apiPath:
            apiPath +
            (!['POST', 'PUT'].includes(requestOptions?.method) &&
              apiPath?.indexOf('?') === -1
              ? `?CallingChannelCode=${process.env.REACT_APP_CHANNEL_CODE
              }&CallerId=${uuidv4()}`
              : !['POST', 'PUT'].includes(requestOptions?.method) &&
                apiPath?.indexOf('?') !== -1
                ? `&CallingChannelCode=${process.env.REACT_APP_CHANNEL_CODE
                }&CallerId=${uuidv4()}`
                : ''),
          baseApiPath,
          defaultDataValue: [],
          requestOptions: requestOptions && {
            ...requestOptions,
            body: ['POST', 'PUT'].includes(requestOptions?.method)
              ? isFormData
                ? requestOptions.body
                : JSON.stringify({
                  ...requestOptions.body,
                  CallingChannelCode: process.env.REACT_APP_CHANNEL_CODE,
                  CallerId: uuidv4(),
                })
              : JSON.stringify(requestOptions.body),
          },
        }),
      );

  const mappedData = success && mapper ? (data ? mapper(data) : []) : data;
  if (success) {
    if (dispatchSuccess || defaultEndCallApiSuccess) {
      yield put(
        dispatchSuccess
          ? dispatchSuccess({ data: mappedData, meta: meta })
          : defaultEndCallApiSuccess(),
      );
    }

    if (successCallback && typeof successCallback === 'function') {
      yield call(successCallback);
    }
  } else {
    if (Array.isArray(dispatchFailure)) {
      for (const failureDispatch of dispatchFailure) {
        if (isGeneratorFunction(failureDispatch)) {
          yield call(failureDispatch);
        } else {
          yield put(failureDispatch(mappedData));
        }
      }
    } else {
      if (dispatchFailure || defaultEndCallApiFailure) {
        yield put(
          dispatchFailure
            ? dispatchFailure(mappedData)
            : defaultEndCallApiFailure(),
        );
      }
    }
  }
}
export const requestUtils = { getApiBasePath, request, checkStatus, parseJSON };

