import {
    FilterCriteriaDeliverySlips,
    IDeliverySlipService,
    IDeliverySlipDetailsService,
    PAGINATION,
} from '@reinsurance/helpers';
import {
    Backdrop,
    CardContainer,
    EmptyState,
    Grid,
    Skeleton,
    Stack,
    Table,
} from '@reinsurance/ui-kit';
import emptyStateDesk from '@reinsurance/ui-kit/src/assets/images/emptyStateDesk.svg';
import emptyStatePerson from '@reinsurance/ui-kit/src/assets/images/emptyStatePerson.svg';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    REINSURANCE_DELIVERYSLIP_TABLE_COLUMNS_DEFAULT,
    REINSURANCE_DELIVERYSLIP_TABLE_HIDDEN_COLUMNS_DEFAULT,
    REINSURANCE_DELIVERYSLIP_TABLE_DETAILS_COLUMNS_DEFAULT,
} from '../../constants';
import {
    WORKFLOW_STEP_CODES,
} from '../../../../constants/global';
import { deliverySlipStatusComponent } from '../../../../utils/QuittanceHelpers';

export const ReinsuranceDeliverySlips = ({
    deliverySlipServices,
    deliverySlipDetailsServices,
    detailsPage,
    initialFilterValues,
}: {
    deliverySlipServices: IDeliverySlipService;
    deliverySlipDetailsServices: IDeliverySlipDetailsService;
    detailsPage: string;
    initialFilterValues: FilterCriteriaDeliverySlips;
}) => {
    const navigate = useNavigate();
    const [filterValues, setFilterValues] = useState<any>(initialFilterValues);
    const [emptySearchResult, setEmptySearchResult] = useState({
        isEmptyResult: false,
        isSearchMode: false,
    });
    const [deliverySlipReferenceToView, setDeliverySlipReferenceToView] = useState<string | null>(null);

    const {
        responseData: deliverySlipsReinsurance,
        meta: deliverySlipsMeta,
        isLoading: isLoadingDeliverySlipsData,
        error: errorDeliverySlipsData,
    } = useSelector((state: any) => state.deliverySlipsReinsurance);

    const [deliverySlipsData, setDeliverySlipsData] = useState<any[]>([]);

    const handleSubmit = (values: FilterCriteriaDeliverySlips) => {
        const criteria = {
            ...values,
            workFlowStepCode: WORKFLOW_STEP_CODES.REINSURANCES,
            reference: values.reference,
        };
        deliverySlipServices.getAllReinsuranceDeliverySlipsByCriteria &&
            deliverySlipServices.getAllReinsuranceDeliverySlipsByCriteria(criteria);

        setEmptySearchResult({
            ...emptySearchResult,
            isSearchMode: true,
        });
        setFilterValues(values);
    };

    useEffect(() => {
        handleSubmit(initialFilterValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialFilterValues]);

    useEffect(() => {
        setDeliverySlipsData(deliverySlipsReinsurance);
    }, [deliverySlipsReinsurance]);

    useEffect(() => {
        let updatedData: any[] = [];

        updatedData = deliverySlipsData.map((item: any) => {
            return {
                ...item,
                status: deliverySlipStatusComponent(
                    item.publicDeliverySlipStatusCode,
                    item.publicDeliverySlipStatusLabel),
                isLoaded: true,
            };
        });
        setDeliverySlipsData(updatedData);
    }, [deliverySlipsData]);

    useEffect(() => {
        if (deliverySlipReferenceToView && errorDeliverySlipsData) {
            const filteredData = deliverySlipsData.filter(item => item.reference === deliverySlipReferenceToView);
            let updatedData: any[] = [];
            updatedData = filteredData.map(item => {
                return {
                    ...item,
                    isLoaded: true,
                };
            });
            setDeliverySlipsData(prevData => {
                return prevData.map(item => {
                    const updatedItem = updatedData.find(updated => updated.reference === item.reference);
                    return updatedItem || item;
                });
            });
            setDeliverySlipReferenceToView(null);
            deliverySlipServices.clearGetDeliverySlipById && deliverySlipServices.clearGetDeliverySlipById();
        }
    }, [errorDeliverySlipsData, deliverySlipReferenceToView]);

    const handleOnPageChange = (page: number) => {
        deliverySlipServices.getAllReinsuranceDeliverySlipsByCriteria &&
            deliverySlipServices.getAllReinsuranceDeliverySlipsByCriteria({
                ...filterValues,
                workFlowStepCode: WORKFLOW_STEP_CODES.REINSURANCES,
                reference: filterValues.reference,
                deliverySlipStatusId: filterValues.deliverySlipStatusId,
                meta: {
                    pageIndex: page,
                    pageSize: PAGINATION.PAGE_SIZE,
                },
            });
    };

    const intl = useIntl();

    const onOpenDetailRow = (row: any) => {
        if (!row.isOpen && !deliverySlipsData.filter(item => item.reference === row.data.reference).some(item => item.isLoaded)) {
            setDeliverySlipReferenceToView(row.data.reference);
        }
    }

    return (
        <Grid>
            {isLoadingDeliverySlipsData ? (
                <Stack spacing={2} mt={3}>
                    <Skeleton variant="rectangular" mt={2} height={100} />
                    <Skeleton variant="rectangular" mt={2} height={100} />
                    <Skeleton variant="rectangular" mt={2} height={100} />
                </Stack>
            ) : errorDeliverySlipsData ? (
                <CardContainer mt={3}>
                    <EmptyState
                        title={intl.formatMessage({
                            id: 'error.api.title',
                        })}
                        subTitle={intl.formatMessage({
                            id: 'error.api.subTitle',
                        })}
                    />
                </CardContainer>
            ) : deliverySlipsData?.length > 0 ? (
                        <Table
                            isCollapsable={true}
                            rows={deliverySlipsData}
                            columns={REINSURANCE_DELIVERYSLIP_TABLE_COLUMNS_DEFAULT}
                            detailsColumns={REINSURANCE_DELIVERYSLIP_TABLE_DETAILS_COLUMNS_DEFAULT}
                            hiddenColumns={REINSURANCE_DELIVERYSLIP_TABLE_HIDDEN_COLUMNS_DEFAULT}
                            onClickDetailRow={(row: any) => {
                                navigate(
                                    `${detailsPage}?deliverySlipId=${row.id}`,
                                );
                            }}
                            onOpenDetailRow={(row: any) => onOpenDetailRow(row)}
                            pagination={{
                                meta: deliverySlipsMeta,
                                handleOnChangePage: (page: number) => handleOnPageChange(page),
                            }}
                />
            ) : (
                <CardContainer px={8} pt={8} pb={15.5}>
                    <EmptyState
                        title={
                            emptySearchResult.isEmptyResult && emptySearchResult.isSearchMode
                                ? intl.formatMessage({
                                    id: 'deliverySlips.searchResult.empty.title',
                                })
                                : intl.formatMessage({ id: 'empty_state.title' })
                        }
                        subTitle={
                            emptySearchResult.isEmptyResult && emptySearchResult.isSearchMode
                                ? intl.formatMessage({
                                    id: 'deliverySlips.empty.subTitle',
                                })
                                : intl.formatMessage({
                                    id: 'deliverySlips.empty.subTitle',
                                })
                        }
                        image={
                            emptySearchResult.isEmptyResult && emptySearchResult.isSearchMode
                                ? emptyStatePerson
                                : emptyStateDesk
                        }
                    />
                </CardContainer>
            )}
            <Backdrop open={isLoadingDeliverySlipsData} />
        </Grid>
    );
};