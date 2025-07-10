using MediatR;
using OfficeOpenXml;
using Org.BouncyCastle.Crypto;
using PdfSharpCore;
using SA.CheckTrackingPlatform.Common.Resources;
using SA.CheckTrackingPlatform.Common.Resources.Canvases;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes;
using SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static System.CoreConstants;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.FileExcel
{
    public class FileExcelQuery : BaseRequest<FileExcelResponse>
    {
        #region Properties 

        FileExcelResponse response = new FileExcelResponse();
        public string DocumentTypeCode { get; set; }

        #endregion Properties

        public class FileExcelQueryHandler : IRequestHandler<FileExcelQuery, FileExcelResponse>
        {
            #region Fields 

            private readonly IInternalUserQueryRepository internalUserQueryRepository;
            private readonly IChecksQueryRepository checksQueryRepository;
            private readonly IDocumentGenerator documentGenerator;
            private readonly IMediator mediator;

            #endregion Fields 

            #region Constructors 

            public FileExcelQueryHandler(
                IInternalUserQueryRepository internalUserQueryRepository,
                IChecksQueryRepository checksQueryRepository,
                IDocumentGenerator documentGenerator,
                IMediator mediator)
            {
                this.checksQueryRepository = checksQueryRepository;
                this.internalUserQueryRepository = internalUserQueryRepository;
                this.documentGenerator = documentGenerator;
                this.mediator = mediator;
            }

            #endregion Constructors 

            #region Methods 

            public async Task<FileExcelResponse> Handle(FileExcelQuery request, CancellationToken cancellationToken)
            {
                return await ExecutionHelper.Proceed(async () =>
                {
                    #region Declarations

                    FileExcelResponse response = new FileExcelResponse();

                    #endregion Declarations   

                    #region Validations  

                    if (request.IsNotValid())
                    {
                        response.IsSuccess = false;
                        response.WarningMessage = WarningMessages.QueryRequired;
                        return response;
                    }

                    #endregion Validations

                    #region Operations

                    if (response.IsSuccess)
                    {

                        var checksByStatus = await checksQueryRepository.GetChecksWithLatestStatusGroupedByStatusAsync();

                        var kpiResponse = new GetKPIsCountResponse
                        {
                            Data = new GetKPIsCountResponseByAllItem
                            {
                                NumberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit = checksByStatus.TryGetValue(Constants.TimelineStatusCodes.EditedCheck.ToLowerInvariant(), out var val1) ? val1 : 0,
                                NumberOfChecksReceivedByBusinessUnitButNotByRegistryOffice = checksByStatus.TryGetValue(Constants.TimelineStatusCodes.ReceivedTrade.ToLowerInvariant(), out var val2) ? val2 : 0,
                                NumberOfChecksReceivedByRegistryOfficeButNotSentToClient = checksByStatus.TryGetValue(Constants.TimelineStatusCodes.ReceivedOffice.ToLowerInvariant(), out var val3) ? val3 : 0,
                                NumberOfReturnedChecksNotYetReceived = checksByStatus.TryGetValue(Constants.TimelineStatusCodes.ReturnClient.ToLowerInvariant(), out var val4) ? val4 : 0
                            }
                        };


                        const string ExportDateFormat = "yyyyMMdd_HHmmss";
                        string timestamp = DateTime.Now.ToString(ExportDateFormat);

                        string fileName = "";
                        byte[] fileExcel = Array.Empty<byte>();
                        string statusCode = "";

                        switch (request.DocumentTypeCode)
                        {
                            case Constants.DocumentTypeCodes.NumberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit:
                                statusCode = Constants.TimelineStatusCodes.EditedCheck.ToLowerInvariant();
                                fileName = $"ChecksIssuedButNotAcknowledged_{timestamp}.xlsx";
                                break;

                            case Constants.DocumentTypeCodes.NumberOfChecksReceivedByBusinessUnitButNotByRegistryOffice:
                                statusCode = Constants.TimelineStatusCodes.ReceivedTrade.ToLowerInvariant();
                                fileName = $"ChecksReceivedByBusinessUnit_{timestamp}.xlsx";
                                break;

                            case Constants.DocumentTypeCodes.NumberOfChecksReceivedByRegistryOfficeButNotSentToClient:
                                statusCode = Constants.TimelineStatusCodes.ReceivedOffice.ToLowerInvariant();
                                fileName = $"ChecksReceivedByRegistryOffice_{timestamp}.xlsx";
                                break;

                            case Constants.DocumentTypeCodes.NumberOfReturnedChecksNotYetReceived:
                                statusCode = Constants.TimelineStatusCodes.ReturnClient.ToLowerInvariant();
                                fileName = $"ReturnedChecksNotYetReceived_{timestamp}.xlsx";
                                break;

                            default:
                                response.IsSuccess = false;
                                response.WarningMessage = "Type de document non reconnu.";
                                return response;
                        }

                        var checks = await checksQueryRepository.GetChecksWithLatestStatusGroupedByStatusAsync(statusCode);
                        fileExcel = await FileExcelKPIItemShow(checks);

                        response.Data = new FileExcelResponse
                        {
                            Name = fileName,
                            ContentType = Constants.ContentTypes.Excel,
                            Content = fileExcel
                        };
                    }

                    #endregion Operations

                    return response;
                }, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);

            }

            private async Task<byte[]> FileExcelKPIItemShow(IEnumerable<KPIItemShow> checks) // type d'objet passer est <KPIItemShow>> et pas checks
            {
                return await documentGenerator.GenerateCanvas(
                    new List<CanvasSheet<KPIItemShow>>()
                    {
            new CanvasSheet<KPIItemShow>()
            {
                SheetName = SheetNames.KPIRenovelFile,
                CanvasBody = new CanvasBody<KPIItemShow>()
                {
                    StartingRow = 1,
                    StartingColumn = 1,
                    ExtraRows = 20,
                    Labels = new List<string>()
                    {
                        BodyLabels.AmountRef,
                        BodyLabels.CheckNumberRef,
                        BodyLabels.LotNumberRef,
                        BodyLabels.RecipientNameRef,
                        BodyLabels.BeneficiaryNameRef,
                        BodyLabels.CreationDateRef,
                    },
                    LabelsCanvasCellStyle = new CanvasCellStyle()
                    {
                        IsInBold = true,
                        CanvasCellBorderThickness = CanvasCellBorderThickness.Thin,
                        BackgroundColor = (55, 118, 237)
                    },
                    ItemModels = checks,
                    ItemModelsCanvasCellStyle = new CanvasCellStyle()
                    {
                        CanvasCellBorderThickness = CanvasCellBorderThickness.Thin
                    }
                }
            }
                    });
            }
            #endregion Methods 
        }
    }
}