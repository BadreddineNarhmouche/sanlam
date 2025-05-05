import { GeneralHelper } from '@checkTracking/helpers';
import useLocalStorage from '../hooks/useLocalStorage';
import { ROLE } from './role-permission-maps';
import { LocalStorageKeyConstants } from '@checkTracking/helpers/lib/helpers/ConstantsHelper';

export default function useRole(): [ROLE[], (value: string[] | null) => any] {
    const [localStoredUserRole, setLocalStoredUserRole] = useLocalStorage<
        string[] | null
        >(LocalStorageKeyConstants.internalUserInternalRoles, null);

    const setCryptedUserRole = (value: string[] | null) => {
        if (value) {
            const cryptedRoles = value.map(role => GeneralHelper.hashStringValue(role, -10));
            setLocalStoredUserRole(cryptedRoles);
        } else {
            setLocalStoredUserRole(null);
        }
    };

    return [localStoredUserRole ? localStoredUserRole.map((role: string) => GeneralHelper.hashStringValue(role, 10) as ROLE) : [], setCryptedUserRole];
};
