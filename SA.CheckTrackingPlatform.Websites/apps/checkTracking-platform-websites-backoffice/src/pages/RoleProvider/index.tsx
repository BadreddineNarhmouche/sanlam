import useRole from "@checkTracking/shared/src/Roles/useRole";
import {
  Button,
  CardContainer,
  EmptyState,
  Grid,
  Icons,
  Skeleton,
  Stack,
} from "@checkTracking/ui-kit";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getInternalRolesByInternalUserElectronicAddress } from "../../store/InternalRoles/internalRolesSlice";
import { UserService } from "@checkTracking/helpers";

export default function RoleProvider({ children }: PropsWithChildren<any>) {
  const shouldBypassRoleGuards = process.env.NODE_ENV === "development";
  const intl = useIntl();
  const dispatch = useDispatch();
  const [allowRender, setAllowRender] = useState(false);
  const hasRequestedRoles = useRef(false);

  const [currentRoles, setLocalStoredUserRoles] = useRole();
  const currentRolesSignature = currentRoles.join("|");
  const {
    responseData: internalRoles,
    isLoading: isLoadingRole,
    error: isErrorRole,
  } = useSelector((state: any) => state.internalRoles);

  useEffect(() => {
    if (currentRoles.length === 0 && !isErrorRole && !hasRequestedRoles.current) {
      hasRequestedRoles.current = true;
      dispatch(getInternalRolesByInternalUserElectronicAddress({}));
    } else {
      setAllowRender(true);
    }
  }, [currentRoles.length, dispatch, isErrorRole]);

  useEffect(() => {
    if (!internalRoles || internalRoles?.length === 0) return;
    const roleCodes = internalRoles.map((role: any) => role.internalRoleCode);
    const roleCodesSignature = roleCodes.join("|");

    if (roleCodesSignature === currentRolesSignature) {
      return;
    }

    setLocalStoredUserRoles(roleCodes);
  }, [currentRolesSignature, internalRoles, setLocalStoredUserRoles]);

  if (isLoadingRole || (!currentRoles && !allowRender)) {
    return (
      <Stack spacing={2} mt={3}>
        <Skeleton variant="rectangular" mt={2} height={100} />
      </Stack>
    );
  }

  if (isErrorRole) {
    if (shouldBypassRoleGuards) {
      return children;
    }

    return (
      <CardContainer mt={3}>
        <EmptyState
          title={intl.formatMessage({
            id: "error.api.title",
          })}
          subTitle={intl.formatMessage({
            id: "error.api.subTitle",
          })}
          action={{
            label: intl.formatMessage({ id: "button.retry" }),
            startIcon: <Icons.Refresh />,
            onClick: () => window.location.reload(),
          }}
        />
        <Grid item xs paddingTop={2} sx={{ margin: "0 auto" }}>
          <Button
            onClick={() =>
              UserService.signOut().then(() => {
                window.location.reload();
              })
            }
            variant="outlined"
          >
            {intl.formatMessage({ id: "nav_bar.logout_button" })}
          </Button>
        </Grid>
      </CardContainer>
    );
  }

  if (!internalRoles || internalRoles?.length === 0) {
    if (shouldBypassRoleGuards) {
      return children;
    }

    return (
      <CardContainer mt={3}>
        <EmptyState
          title={intl.formatMessage({
            id: "user.not_authorized.title",
          })}
          subTitle={intl.formatMessage({
            id: "user.not_authorized.subTitle",
          })}
        />
        <Grid item xs paddingTop={2} sx={{ margin: "0 auto" }}>
          <Button
            onClick={() =>
              UserService.signOut().then(() => {
                window.location.reload();
              })
            }
            variant="outlined"
          >
            {intl.formatMessage({ id: "nav_bar.logout_button" })}
          </Button>
        </Grid>
      </CardContainer>
    );
  }

  return children;
}
