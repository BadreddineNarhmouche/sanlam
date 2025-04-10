import { Notification } from '@reinsurance/helpers';

export const mapNotificationsList = (notifications: any): Notification[] => {
  return notifications
    ? notifications?.map((notification: any) => ({
        id: notification.id,
        subject: notification.subject,
        body: notification.body,
        isSeen: notification.isSeen,
        creationDate: notification.creationDate,
        quittanceId: notification.quittanceId,
        deliverySlipId: notification.deliverySlipId,
        notificationTypeCode: notification.notificationTypeCode,
      }))
    : [];
};

