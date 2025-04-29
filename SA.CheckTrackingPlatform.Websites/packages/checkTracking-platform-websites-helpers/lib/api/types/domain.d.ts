export interface DataSliceState<T> {
    responseData: T[] | T;
    meta?: {
        itemsCount: number;
        pageCount: number;
        pageIndex: number;
        pageSize: number;
        totalCount: number;
        unseenCount?: number;
    };
    isLoading: boolean;
    error: string | null;
}
export interface CommonProps {
    isDeactivated: boolean;
    isDeleted: boolean;
}
export interface ReferentialDataItem {
    code: string;
    label: string;
}
export interface City extends ReferentialDataItem {
    countryId: string;
}
export interface PostalCode extends ReferentialDataItem {
    cityId: string;
}
export interface ReferentialData {
    activities: ReferentialDataItem[];
    countries: ReferentialDataItem[];
    cities: City[];
    postalCodes: PostalCode[];
    identifierTypes: ReferentialDataItem[];
    prospectCategories: ReferentialDataItem[];
    civilities: ReferentialDataItem[];
    addressTypes: ReferentialDataItem[];
    nationalities: ReferentialDataItem[];
    moralPersonTypes: ReferentialDataItem[];
    professionalPersonTypes: ReferentialDataItem[];
}
export interface Notification {
    id: string;
    subject?: string;
    body?: string;
    isSeen?: boolean;
    creationDate?: any;
    quittanceId?: string;
    deliverySlipId?: string;
    notificationTypeCode?: string;
    internalUserId?: number;
}
export interface FilterCriteriaNotifications {
    internalUserId: number;
    notificationTypeCode?: string;
    fromCreationDate?: Date;
    toCreationDate?: Date;
    isSeen?: boolean;
    meta?: {
        pageIndex?: number;
        pageSize?: number;
    };
}
export interface InternalUser {
    id: number;
    firstName?: string;
    lastName?: string;
    electronicAddressEmail?: string;
    isSeen?: boolean;
    meta?: {
        pageIndex?: number;
        pageSize?: number;
    };
}
