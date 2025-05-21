import { Notification } from '@checkTracking/helpers';

export const mapNotificationsList = (notifications: any): Notification[] => {
  return notifications
    ? notifications?.map((notification: any) => ({
        id: notification.id,
        subject: notification.subject,
        body: notification.body,
        isSeen: notification.isSeen,
        creationDate: notification.creationDate,
        checkId: notification.checkId,
        deliverySlipId: notification.deliverySlipId,
        notificationTypeCode: notification.notificationTypeCode,
      }))
    : [];
};

