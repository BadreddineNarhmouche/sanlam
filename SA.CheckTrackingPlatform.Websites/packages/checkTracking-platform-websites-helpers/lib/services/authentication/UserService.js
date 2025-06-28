import Keycloak from "keycloak-js";
import { GeneralHelper, LocalStorageHelper } from "../..";
import { LocalStorageKeyConstants } from "../../helpers/ConstantsHelper";
import { v4 as uuidv4 } from "uuid";
const initOptions = {
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    url: process.env.REACT_APP_KEYCLOAK_URL,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
};
const keycloak = new Keycloak(initOptions);
const initKeycloak = (onAuthenticatedCallback, onAuthenticatedFailedCallback) => {
    keycloak
        .init({
        useNonce: true,
        onLoad: "login-required",
        checkLoginIframe: true,
        checkLoginIframeInterval: 5,
        responseMode: "fragment",
        flow: "standard",
        enableLogging: false,
        pkceMethod: "S256",
        messageReceiveTimeout: 10000,
    })
        .then(async (authenticated) => {
        if (!authenticated) {
            console.log("user is not authenticated..!");
        }
        else {
            console.log("you are connected");
            LocalStorageHelper.clear();
            await getCurrentInternalUser();
        }
        onAuthenticatedCallback();
    })
        .catch((error) => {
        console.log("error authentication", error);
        onAuthenticatedFailedCallback();
    });
};
const signIn = keycloak.login;
const signOut = () => {
    return new Promise((resolve, reject) => {
        keycloak
            .logout()
            .then(() => {
            LocalStorageHelper.clear();
            keycloak.redirectUri = window.location.origin;
            resolve({
                isSuccess: true,
            });
        })
            .catch((error) => {
            console.log("AuthenticationError-0004: Contact the administrator.");
            resolve({
                isSuccess: false,
                error: error,
            });
        });
    });
};
const getToken = () => keycloak.token;
const updateToken = async (successCallback) => {
    try {
        await keycloak.updateToken(10);
        if (successCallback)
            return successCallback();
    }
    catch (error) {
        signOut();
    }
};
const refreshToken = async () => {
    try {
        const currentTime = Date.now() / 1000;
        const tokenValidity = keycloak.tokenParsed?.exp ?? -currentTime;
        await keycloak.updateToken(tokenValidity);
    }
    catch (error) {
        signOut();
    }
};
const setupTokenRefreshTrigger = () => {
    const refreshTokenValidity = keycloak.refreshTokenParsed?.exp
        ? keycloak.refreshTokenParsed.exp * 1000 - Date.now()
        : -1;
    if (refreshTokenValidity > 0) {
        setInterval(() => {
            refreshToken();
        }, refreshTokenValidity - 120000);
    }
    else {
        setTimeout(setupTokenRefreshTrigger, 5000);
    }
};
setupTokenRefreshTrigger();
keycloak.onTokenExpired = () => {
    updateToken();
};
const getUsername = () => keycloak.tokenParsed?.preferred_username;
const isAuthenticated = () => keycloak.authenticated;
const getTokenParsed = () => {
    if (isAuthenticated()) {
        return keycloak.tokenParsed;
    }
};
const hasRole = (roles) => Array.isArray(roles)
    ? roles.some((role) => {
        return keycloak.hasResourceRole(role);
    })
    : keycloak.hasResourceRole(roles);
const isAuthorized = (internalRoleCodes) => {
    if (!isAuthenticated()) {
        return false;
    }
    if (GeneralHelper.isArrayNullOrEmpty(internalRoleCodes)) {
        return true;
    }
    if (LocalStorageHelper.contains(LocalStorageKeyConstants.internalUserInternalRoles)) {
        let data = LocalStorageHelper.get(LocalStorageKeyConstants.internalUserInternalRoles);
        if (GeneralHelper.isArrayNotNullOrEmpty(data)) {
            const containsList = (mainList, subList) => subList.some((item) => mainList.includes(item));
            return containsList(data, internalRoleCodes);
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};
const getCurrentInternalUserElectronicAddress = () => {
    const tokenParsed = getTokenParsed();
    if (GeneralHelper.isObjectNotNull(tokenParsed)) {
        return tokenParsed.email;
    }
};
const getCurrentInternalUser = () => {
    return new Promise((resolve, reject) => {
        if (isAuthenticated()) {
            if (LocalStorageHelper.contains(LocalStorageKeyConstants.internalUser)) {
                const internalUser = LocalStorageHelper.get(LocalStorageKeyConstants.internalUser);
                resolve({
                    isSuccess: true,
                    firstName: internalUser["firstName"],
                    lastName: internalUser["lastName"],
                    electronicAddress: internalUser["electronicAddress"],
                });
            }
            else {
                const headers = {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                };
                const criteria = {
                    electronicAddress: getCurrentInternalUserElectronicAddress(),
                    callingChannelCode: process.env.REACT_APP_CHANNEL_CODE,
                    callerId: uuidv4(),
                };
                fetch(`${process.env.REACT_APP_API_BASE_PATH}/InternalUsers/GetByElectronicAddress` +
                    `?electronicAddress=${criteria.electronicAddress}` +
                    `&callingChannelCode=${criteria.callingChannelCode}` +
                    `&callerId=${criteria.callerId}`, { headers })
                    .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                    .then((data) => {
                    if (data.isSuccess && data.isPopulated) {
                        LocalStorageHelper.add(LocalStorageKeyConstants.internalUser, {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            electronicAddress: data.electronicAddress,
                        });
                        resolve({
                            isSuccess: true,
                            informationMessage: data.informationMessage,
                            warningMessage: data.warningMessage,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            electronicAddress: data.electronicAddress,
                        });
                    }
                    else {
                        resolve({
                            isSuccess: false,
                            informationMessage: data.informationMessage,
                            warningMessage: data.warningMessage,
                        });
                    }
                })
                    .catch((error) => {
                    resolve({
                        isSuccess: false,
                        informationMessage: "",
                        warningMessage: "Une erreur est survenue. Merci d'essayer plus tard",
                    });
                });
            }
        }
        else {
            resolve({
                isSuccess: false,
                informationMessage: "",
                warningMessage: "L'utilisateur n'est pas authentifi�",
            });
        }
    });
};
export const UserService = {
    initKeycloak,
    signIn,
    signOut,
    isAuthenticated,
    getToken,
    updateToken,
    refreshToken,
    getUsername,
    hasRole,
    getCurrentInternalUser,
    isAuthorized,
};
//# sourceMappingURL=UserService.js.map