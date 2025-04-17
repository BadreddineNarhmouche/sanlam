import { FormattedMessage } from "react-intl";
import { GeneralHelper } from "@reinsurance/helpers";
import {
  Button,
  CardContainer,
  Grid,
  Icons,
  Tabs,
  Theme,
  Typography,
} from "@reinsurance/ui-kit";
import { CSSProperties } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

interface contentProps {
  count: number;
  code: string;
  description: string;
  countColor?: CSSProperties["color"];
  onClick: () => any;
  isHideButton: boolean;
}

interface Props {
  title: string;
  contents: Array<contentProps>;
}

interface PropsKPI {
  component: Props;
  hasTeam?: boolean;
  tabs?: {
    label: string;
  }[];
  selectedTab?: number;
  setSelectedTab?: any;
}

const KPICard = ({
  component,
  hasTeam,
  tabs,
  selectedTab,
  setSelectedTab,
}: PropsKPI) => {
  const renderTabs = () =>
    tabs &&
    setSelectedTab && (
      <Tabs
        tabs={tabs}
        value={selectedTab}
        onChange={(event: any, newValue: number) =>
          setSelectedTab && setSelectedTab(newValue)
        }
        {...(tabs.length > 5 && { variant: "scrollable" })}
      />
    );

  const {
    responseData: exportFileExcelRenovel,
    isLoading,
    error,
  } = useSelector((state: any) => state.exportFileExcelRenovel);

  const renderContent = (contents: any) => (
    <Grid container direction="row" mt={2}>
      {contents?.map((content: any, index: number) => (
        <Grid key={content.description + index} item display="flex">
          <Typography
            variant="h4"
            color={content.countColor ?? Theme.theme.palette.primary.main}
            fontSize={40}
          >
            {GeneralHelper.formatNumber(content.count)}
          </Typography>
          {content.isHideButton ? (
            <Button
              variant="text"
              endIcon={<Icons.ArrowForward />}
              px={2}
              onClick={() => content.onClick && content.onClick()}
              disabled={isLoading}
            >
              {isLoading && (
                <CircularProgress color="primary" size={24} sx={{ mr: 1 }} />
              )}
              {content.description}
            </Button>
          ) : null}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <CardContainer minHeight={170}>
      <Typography
        variant="h5"
        color={
          // @ts-ignore
          Theme.theme.palette.base.greyDark
        }
      >
        <FormattedMessage id={component.title} />
      </Typography>
      {hasTeam && renderTabs()}
      {renderContent(component.contents)}
    </CardContainer>
  );
};

export const GenericKPI = ({
  component,
  hasTeam,
  tabs,
  selectedTab,
  setSelectedTab,
}: PropsKPI) => {
  return (
    <KPICard
      component={component}
      hasTeam={hasTeam}
      setSelectedTab={setSelectedTab}
      selectedTab={selectedTab}
      tabs={tabs}
    />
  );
};
