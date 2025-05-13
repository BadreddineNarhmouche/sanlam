// CheckDetails.tsx
import { IDetailsChecksService, DetailsCheck } from "@checkTracking/helpers";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import {
  CardContainer,
  Grid,
  Skeleton,
  Typography,
} from "@checkTracking/ui-kit";

interface CheckDetailsProps {
  services: IDetailsChecksService;
  detailsPage: string;
}

export const CheckDetails: React.FC<CheckDetailsProps> = ({
  services,
  detailsPage,
}) => {
  const intl = useIntl();

  const {
    responseData: data,
    isLoading,
    error,
  } = useSelector((st: any) => st.getCheckById) as {
    responseData: DetailsCheck | null;
    isLoading: boolean;
    error: string | null;
  };

  console.log(data);

  const labels: Record<keyof DetailsCheck, string> = {
    id: intl.formatMessage({ id: "N°chèques" }),
    amount: intl.formatMessage({ id: "N° Montant" }),
    bankId: intl.formatMessage({ id: "N° banque" }),
    branchId: intl.formatMessage({ id: "N° branche" }),
    serviceId: intl.formatMessage({ id: "N° service" }),
    checkNumber: intl.formatMessage({ id: "N° chèque" }),
    statusId: intl.formatMessage({ id: "N° status" }),
    lotNumber: intl.formatMessage({ id: "lot Number" }),
    recipientName: intl.formatMessage({ id: "Destinataire" }),
    beneficiaryName: intl.formatMessage({ id: "Nom beneficiaire" }),
    sinisterNumber: intl.formatMessage({ id: "N° sinistre" }),
    accountNumber: intl.formatMessage({ id: "N° de Compte" }),

    registerOrderNumber: intl.formatMessage({
      id: "register Order",
    }),
    transactionNumber: intl.formatMessage({
      id: "numéro de transaction",
    }),
    code: intl.formatMessage({ id: "code" }),
    label: intl.formatMessage({ id: "label" }),
  };

  const formatValue = (key: keyof DetailsCheck, obj: DetailsCheck) => {
    const raw = (obj as any)[key];
    if (raw === null || raw === undefined || raw === "") return "—";
    if (key === "amount") {
      return raw.toLocaleString(undefined, { minimumFractionDigits: 2 });
    }
    return raw;
  };

  if (error) {
    return (
      <CardContainer px={8} pt={8} pb={15.5}>
        <Typography color="error">
          {intl.formatMessage({ id: "error.api.title" })}
        </Typography>
      </CardContainer>
    );
  }

  return (
    <CardContainer px={8} pt={8} pb={15.5}>
      <Grid container spacing={4}>
        {(Object.keys(labels) as (keyof DetailsCheck)[]).map((key) => (
          <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="caption" color="text.secondary">
              {labels[key]}
            </Typography>

            {isLoading || !data ? (
              <Skeleton variant="text" width="80%" height={20} />
            ) : (
              <Typography variant="body1">{formatValue(key, data)}</Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </CardContainer>
  );
};

export default CheckDetails;
