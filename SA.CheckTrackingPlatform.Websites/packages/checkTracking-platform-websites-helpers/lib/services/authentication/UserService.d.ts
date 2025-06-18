export declare const UserService: {
    initKeycloak: (onAuthenticatedCallback: (args?: any) => any, onAuthenticatedFailedCallback: (args?: any) => any) => any;
    signIn: any;
    signOut: () => Promise<unknown>;
    isAuthenticated: () => any;
    getToken: () => string | undefined;
    updateToken: (successCallback?: any) => Promise<any>;
    refreshToken: () => Promise<void>;
    getUsername: () => string | undefined;
    hasRole: (roles: string[] | string) => boolean;
    getCurrentInternalUser: () => Promise<any>;
    isAuthorized: (internalRoleCodes: any) => any;
};
