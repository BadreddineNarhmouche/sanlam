import { Chip } from '@checkTracking/ui-kit';
import {
    CHECK_STATUS_CODES,
    CHECK_PAYMENT_STATUS_CODES,
} from '../constants/global';

const ColorCodes = {
    greenLight: '#E3FAF6',
    greenDark: '#76C2B6',
    yellowLight: '#FEF1D1',
    yellowDark: '#FCB718',
    redLight: '#F6CCD1',
    redDark: '#F44336',
    blueLight: '#E3F6FF',
    blueDark: '#0081C6',
    greyLight: '#CACACA',
    greyDark: '#6E6E6E'
};

export const checkStatusComponent = (
    checkStatusCode: string,
    checkStatusLabel: string,
) => {

    switch (checkStatusCode) {
        case CHECK_STATUS_CODES.DRAFT:
        case CHECK_STATUS_CODES.TO_DO_SUBSCRIPTION:
        case CHECK_STATUS_CODES.TO_DO_RECOVERY:
        case CHECK_STATUS_CODES.TO_DO_checkTracking:
        case CHECK_STATUS_CODES.TO_DO_ACCOUNTING:
            return (
                <Chip
                    label={checkStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.yellowDark,
                        backgroundColor: ColorCodes.yellowLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        case CHECK_STATUS_CODES.IN_PROGRESS_SUBSCRIPTION:
        case CHECK_STATUS_CODES.IN_PROGRESS_RECOVERY:
        case CHECK_STATUS_CODES.IN_PROGRESS_checkTracking:
        case CHECK_STATUS_CODES.IN_PROGRESS_ACCOUNTING:
            return (
                <Chip
                    label={checkStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.blueDark,
                        backgroundColor: ColorCodes.blueLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        case 'Done':
        case CHECK_STATUS_CODES.END_MISSION:
            return (
                <Chip
                    label={checkStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.greenDark,
                        backgroundColor: ColorCodes.greenLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        default:
            return <Chip label={checkStatusLabel} />;
    }
};

export const checkPaymentStatusComponent = (
    checkPaymentStatusCode: string,
    checkPaymentStatusLabel: string,
) => {

    switch (checkPaymentStatusCode) {
        case CHECK_PAYMENT_STATUS_CODES.PAID:
            return (
                <Chip
                    label={checkPaymentStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.blueDark,
                        backgroundColor: ColorCodes.blueLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        case CHECK_PAYMENT_STATUS_CODES.UNPAID:
            return (
                <Chip
                    label={checkPaymentStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.yellowDark,
                        backgroundColor: ColorCodes.yellowLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        default:
            return <Chip label={checkPaymentStatusLabel} />;
    }
};

export const deliverySlipStatusComponent = (
    deliverySlipStatusCode: string,
    deliverySlipStatusLabel: string,
) => {

    switch (deliverySlipStatusCode) {
        case CHECK_STATUS_CODES.TO_DO_checkTracking:
        case CHECK_STATUS_CODES.TO_DO_ACCOUNTING:
            return (
                <Chip
                    label={deliverySlipStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.yellowDark,
                        backgroundColor: ColorCodes.yellowLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        case CHECK_STATUS_CODES.IN_PROGRESS_checkTracking:
        case CHECK_STATUS_CODES.IN_PROGRESS_ACCOUNTING:
        case CHECK_STATUS_CODES.IN_PROGRESS_PAYMENT:
            return (
                <Chip
                    label={deliverySlipStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.blueDark,
                        backgroundColor: ColorCodes.blueLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        default:
            return (
                <Chip label={deliverySlipStatusLabel}/>
            );
    }
};
