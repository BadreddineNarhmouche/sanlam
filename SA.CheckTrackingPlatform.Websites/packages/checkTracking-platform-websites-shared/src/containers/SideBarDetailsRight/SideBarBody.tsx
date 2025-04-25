import {
  Box,
  Button,
  CardContainer,
  EmptyState,
  Grid,
  Icons,
  Skeleton,
  Stack,
} from "@checkTracking/ui-kit";
import emptyStateDesk from "@checkTracking/ui-kit/src/assets/images/emptyStateDesk.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { FormattedMessage, injectIntl, useIntl } from "react-intl";
import {
  DynamicDataContainer,
  loadMoreButton,
  loadMoreContainer,
  timelineContainer,
} from "./styles";

const SideBarBody = ({
  isLoading,
  isError,
  errorAction,
  isEmptyData,
  loadMoreAction,
  canLoadMore,
  mainContent,
  containerStyle,
}: {
  isLoading: boolean;
  isError: boolean;
  errorAction: any;
  isEmptyData?: boolean;
  loadMoreAction?: any;
  canLoadMore?: boolean;
  mainContent: any;
  containerStyle?: any;
  intl: any;
}) => {
  const intl = useIntl();

  return (
    <Grid sx={containerStyle ? containerStyle : timelineContainer}>
      {isEmptyData && !isLoading ? (
        <Box sx={DynamicDataContainer}>
          <CardContainer px={8} pt={8} pb={15.5}>
            <EmptyState
              title={intl.formatMessage({ id: "demands.empty.title" })}
              subTitle={""}
              image={emptyStateDesk}
            />
          </CardContainer>
        </Box>
      ) : (
        mainContent
      )}

      {isEmptyData && isLoading ? (
        <Grid container direction="row" spacing={2} xl={12}>
          <Grid item xs>
            <Stack spacing={2} mt={3}>
              <Skeleton variant="rectangular" mt={2} height={100} />
              <Skeleton variant="rectangular" mt={2} height={100} />
              <Skeleton variant="rectangular" mt={2} height={100} />
            </Stack>
          </Grid>
        </Grid>
      ) : isError ? (
        <CardContainer mx={2} my={3}>
          <EmptyState
            title={intl.formatMessage({ id: "error.api.title" })}
            subTitle={intl.formatMessage({ id: "error.api.subTitle" })}
            action={{
              label: intl.formatMessage({ id: "button.retry" }),
              startIcon: <Icons.Refresh />,
              onClick: errorAction,
            }}
          />
        </CardContainer>
      ) : (
        !isEmptyData &&
        loadMoreAction && (
          <Box sx={loadMoreContainer}>
            <Button
              {...((!canLoadMore || isLoading) && {
                disabled: true,
              })}
              onClick={loadMoreAction}
              style={loadMoreButton}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <FormattedMessage id="button.loadMore" />
              )}
            </Button>
          </Box>
        )
      )}
    </Grid>
  );
};

export default injectIntl(SideBarBody);
