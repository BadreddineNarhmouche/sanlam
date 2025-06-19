import { useSelector } from "react-redux";
import { GeneralHelper, translate } from "@checkTracking/helpers";
import {
    Alert,
    Button,
    Dialog,
    Grid,
    Icons,
    Typography,
    Dropdown,
    DateRange,
} from "@checkTracking/ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

interface Props {
    openConfiramtionDialog: boolean;
    setOpenConfiramtionDialog: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: () => void;
    handleCancel?: () => void;
    isLoading: boolean;
    error: boolean;
    responseData: any;
    choice?: string;
}

export const DialogConfirmation = ({
    openConfiramtionDialog,
    setOpenConfiramtionDialog,
    handleSubmit,
    choice,
    isLoading,
    error,
    responseData,
    handleCancel,
}: Props) => {
    const intl = useIntl();

    const [reasonMove, setReasonMove] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const { responseData: reasonMoveOptions = [] } = useSelector(
        (state: any) => state.AllReasonMove
    );

    useEffect(() => {
        if (!isLoading && !error && !isEmpty(responseData)) {
            setOpenConfiramtionDialog(false);
        }
    }, [responseData]);

    return (
        <Dialog
            fullWidth
            open={openConfiramtionDialog}
            footerWithBorder={true}
            title={<FormattedMessage id="workflow.confirm_dialog_title" />}
            content={
                <>
                    <Typography variant="body2" mb={2}>
                        <FormattedMessage
                            id="workflow.confirm_dialog_message"
                            values={{
                                choice: !GeneralHelper.isStringNullOrEmpty(choice) ? (
                                    <span style={{ fontWeight: "bold" }}>{`"${choice}"`}</span>
                                ) : (
                                    ""
                                ),
                            }}
                        />
                    </Typography>

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12}>
                            <Dropdown
                                label={intl.formatMessage({ id: "label.reason_move" })}
                                value={reasonMove}
                                options={reasonMoveOptions}
                                onChange={(e) => setReasonMove(e.target.value as string)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DateRange
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                fromDateLabel="Date de début"
                                toDateLabel="Date de fin"
                            />
                        </Grid>
                    </Grid>

                    {error && (
                        <Grid item xs={12} mt={3}>
                            <Alert
                                withBoxStyle={true}
                                severity="error"
                                icon={<Icons.Error />}
                            >
                                <Typography variant="button">
                                    {translate("error.api.title", intl)}
                                </Typography>
                            </Alert>
                        </Grid>
                    )}
                </>
            }
            actions={
                <>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setOpenConfiramtionDialog(false);
                            handleCancel && handleCancel();
                        }}
                        disabled={isLoading}
                    >
                        <Typography variant="button">
                            <FormattedMessage id="button.abandon" />
                        </Typography>
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isLoading || !reasonMove || !startDate || !endDate}
                    >
                        {isLoading && (
                            <CircularProgress color="primary" size={24} sx={{ mr: 1 }} />
                        )}
                        <Typography variant="button">
                            <FormattedMessage
                                id={error ? "button.retry" : "button.confirm"}
                            />
                        </Typography>
                    </Button>
                </>
            }
        />
    );
};
