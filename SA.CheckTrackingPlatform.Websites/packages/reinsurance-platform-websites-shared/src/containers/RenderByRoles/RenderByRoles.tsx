import { GeneralHelper, UserService } from '@reinsurance/helpers';
import { ReactElement, useEffect, useState } from 'react';

interface Props {
    internalRoleCodes: string[];
    children?: ReactElement;
    fallback?: ReactElement;
}

export const RenderByRoles = ({ internalRoleCodes, children, fallback }: Props) => {

    const [isAuthorized, setIsAuthorized] = useState(() => { return false; }); 

    useEffect(() => {
        UserService.getCurrentInternalUser().then((response) => {
            if (response.isSuccess && UserService.isAuthorized(internalRoleCodes.map(internalRole => GeneralHelper.hashStringValue(internalRole, -10)))) {
                setIsAuthorized(true);
            }
        });
    }, [internalRoleCodes]);

    return (isAuthorized ? children : fallback);
}

