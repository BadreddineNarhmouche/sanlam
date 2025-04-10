using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Commands;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper
{
    public class NotificationProfile : Profile
    {
        #region Constructors

        public NotificationProfile()
        {
            CreateMap<Notification, CreateNotificationCommand>().ReverseMap();

            CreateMap<Notification, CreateNotificationResponse>().ReverseMap();

            CreateMap<Notification, GetNotificationByIdResponse>()
                .ForMember(destination => destination.CreationDate, option => option.MapFrom(source => source.CreationDate.ToString()))
                .ReverseMap();

            CreateMap<Notification, GetAllNotificationsByCriteriaResponse>().ReverseMap();

            CreateMap<Notification, GetAllNotificationsItem>()
                .ForMember(destination => destination.DisplayableCreationDate, option => option.MapFrom(source => source.CreationDate == DateTime.MinValue ? string.Empty : source.CreationDate.ToShortDateString()))
                .ForMember(destination => destination.AssignToUserFullName, option => option.MapFrom(source => source.InternalUser.FirstName.BuildFullName(source.InternalUser.LastName)))
                .ForMember(destination => destination.AssignToRole, option => option.MapFrom(source => source.InternalRole.Code))
                .ForMember(destination => destination.NotificationTypeCode, option => option.MapFrom(source => source.NotificationType.Code))
                .ReverseMap();

            CreateMap<Notification, UpdateNotificationResponse>()
                .ForMember(destination => destination.ModificationDate, option => option.MapFrom(source => !source.ModificationDate.HasValue ? string.Empty : source.ModificationDate.Value.ToString()))
                .ReverseMap();
        }

        #endregion Constructors
    }
}