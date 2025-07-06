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

        #endregion Properties

        public class FileExcelQueryHandler : IRequestHandler<FileExcelQuery, FileExcelResponse>
        {
            #region Fields 

            private readonly IInternalUserQueryRepository internalUserQueryRepository;
            private readonly IChecksQueryRepository checksQueryRepository;
            private readonly IDocumentGenerator documentGenerator;

            #endregion Fields 

            #region Constructors 

            public FileExcelQueryHandler(
                IInternalUserQueryRepository internalUserQueryRepository,
                IChecksQueryRepository checksQueryRepository,
                IDocumentGenerator documentGenerator)
            {
                this.checksQueryRepository = checksQueryRepository;
                this.internalUserQueryRepository = internalUserQueryRepository;
                this.documentGenerator = documentGenerator;
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
                        List<KPIItemShow> Checks = new List<KPIItemShow>();
                        var checks = await checksQueryRepository.GetChecksWithLatestStatusAsync();
                        byte[] fileExcel = await FileExcelKPIItemShow(checks);

                        // DEBUG: Sauvegarder le fichier localement
                        string tempPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "DEBUG_" + DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".xlsx");
                        await File.WriteAllBytesAsync(tempPath, fileExcel);
                        Console.WriteLine($"✅ Fichier sauvegardé ici : {tempPath}");

                        // (optionnel) Lire et afficher dans la console
                        using (var package = new ExcelPackage(new FileInfo(tempPath)))
                        {
                            var worksheet = package.Workbook.Worksheets[0];
                            int rows = worksheet.Dimension.Rows;
                            int cols = worksheet.Dimension.Columns;

                            for (int row = 1; row <= rows; row++)
                            {
                                for (int col = 1; col <= cols; col++)
                                {
                                    Console.Write($"{worksheet.Cells[row, col].Text} \t");
                                }
                                Console.WriteLine();
                            }
                        }

                        response.Data = new FileExcelResponse
                        {
                            Content = fileExcel,
                            Name = string.Format("{0}_{1}{2}", DocumentNames.Checks, DateTime.Now.ToString(DateTimeFormats.ShortDateLongTimeWithoutSeparator), FileExtensions.ModernExcel),
                            ContentType = Constants.ContentTypes.Excel
                        };
                    }
                    #endregion Operations

                    return response;
                }, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);

            }

            private async Task<byte[]> FileExcelKPIItemShow(IEnumerable<Checks> checks)
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
                    ItemModels = checks.Select(q => new KPIItemShow()
                    {
                        AmountRef = q.Amount,
                        CheckNumberRef = q.CheckNumber,
                        LotNumberRef = q.LotNumber,
                        RecipientNameRef = q.RecipientName,
                        BeneficiaryNameRef = q.BeneficiaryName,
                        CreationDateRef = q.CreationDate,
                    }),
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

        public class KPIItemShow
        {
            #region properties 

            public double AmountRef { get; set; }
            public string? CheckNumberRef { get; set; }
            public string? LotNumberRef { get; set; }
            public string? RecipientNameRef { get; set; }
            public string? BeneficiaryNameRef { get; set; }
            public DateTime CreationDateRef { get; set; }


            #endregion properties 
        }
    }
}