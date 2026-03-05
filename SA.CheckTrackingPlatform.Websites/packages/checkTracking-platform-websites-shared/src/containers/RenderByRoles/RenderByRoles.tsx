import { GeneralHelper, UserService } from "@checkTracking/helpers";
import { ReactElement, useEffect, useState } from "react";

interface Props {
  internalRoleCodes: string[];
  children?: React.ReactNode;
  fallback?: ReactElement;
}

export const RenderByRoles = ({
  internalRoleCodes,
  children,
  fallback,
}: Props): ReactElement | null => {
  if (process.env.NODE_ENV === "development") {
    return <>{children}</>;
  }

  const [isAuthorized, setIsAuthorized] = useState(() => {
    return false;
  });

  useEffect(() => {
    UserService.getCurrentInternalUser().then((response) => {
      if (
        response.isSuccess &&
        UserService.isAuthorized(
          internalRoleCodes.map((internalRole) =>
            GeneralHelper.hashStringValue(internalRole, -10)
          )
        )
      ) {
        setIsAuthorized(true);
      }
    });
  }, [internalRoleCodes]);

  return isAuthorized ? <>{children}</> : fallback ?? null;
};
