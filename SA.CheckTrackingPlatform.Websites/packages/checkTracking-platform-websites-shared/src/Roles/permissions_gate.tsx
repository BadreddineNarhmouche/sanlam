import { ComponentProps, ReactElement, cloneElement } from 'react';
import { PERMISSIONS, ROLE, SCOPE } from './role-permission-maps';
import useRole from './useRole';

type PermissionsGateProps =
  | {
      scopes: SCOPE[];
      roles?: never;
      children: ReactElement;
      delegatedNoAccessProps?: ComponentProps<any>;
    }
  | {
      scopes?: never;
      roles: ROLE[];
      children: ReactElement;
      delegatedNoAccessProps?: ComponentProps<any>;
    };

const hasPermission = ({
  permissions,
  scopes,
}: {
  permissions: SCOPE[];
  scopes: SCOPE[];
}) => {
  const scopesMap = {} as { [key in SCOPE]: true };
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions?.some((permission: SCOPE) => scopesMap[permission] as any);
};

export const useFilterByRolesOrScopes = ({
    data,
}: {
    data: { [key: string]: any; roles?: ROLE[]; scopes?: SCOPE[] }[];
}) => {
    const [roles] = useRole();
    const filteredData: { [key: string]: any; roles?: ROLE[]; scopes?: SCOPE[] }[] = [];

    roles.forEach((role: ROLE) => {
        const permissions = PERMISSIONS[role];

        const filtered = data?.filter(({ scopes: itemScopes, roles: itemRoles }) => {
            if (itemRoles && itemRoles.length > 0) {
                const hasRole = itemRoles.includes(role);
                if (!hasRole) {
                    return false;
                }
            }

            if (itemScopes && itemScopes.length > 0) {
                const hasScope = hasPermission({ permissions, scopes: itemScopes });
                if (!hasScope) {
                    return false;
                }
            }

            return true;
        });

        if (filtered) {
            filteredData.push(...filtered);
        }
    });

    return filteredData;
};

export function PermissionsGate({
    scopes = [],
    children,
    delegatedNoAccessProps = null,
    roles = [],
}: PermissionsGateProps) {
    if (process.env.NODE_ENV === 'development') {
        return <>{children}</>;
    }

    const [internalRoles] = useRole();

    const permissionGranted = internalRoles.some(role => {
        const permissions = PERMISSIONS[role];
        return (roles.length > 0 && roles.includes(role)) ||
            (roles.length === 0 && hasPermission({ permissions, scopes }));
    });

    if (!permissionGranted && !delegatedNoAccessProps) return null;

    if (!permissionGranted && delegatedNoAccessProps)
        return cloneElement(children, { ...delegatedNoAccessProps });

    return <>{children}</>;
};
