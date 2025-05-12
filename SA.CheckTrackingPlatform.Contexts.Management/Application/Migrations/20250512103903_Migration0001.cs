using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SA.CheckTrackingPlatform.Contexts.Management.Application.Migrations
{
    /// <inheritdoc />
    public partial class Migration0001 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Banks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Code = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Label = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Branchs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Code = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Label = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branchs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InternalRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Code = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Label = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InternalUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    ElectronicAddress = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    FirstName = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    LastName = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CreatedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: false),
                    CreatedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: false),
                    ModificationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    ModifiedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    ModifiedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    IsDeactivated = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DeactivationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DeactivatedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    DeactivatedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    IsDeleted = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DeletedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    DeletedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotificationTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Code = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Label = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Code = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Label = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Code = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Label = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InternalUserInternalRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    InternalUserId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    InternalRoleId = table.Column<int>(type: "NUMBER(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalUserInternalRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InternalUserInternalRoles_InternalRoles_InternalRoleId",
                        column: x => x.InternalRoleId,
                        principalTable: "InternalRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternalUserInternalRoles_InternalUsers_InternalUserId",
                        column: x => x.InternalUserId,
                        principalTable: "InternalUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Subject = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Body = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    IsSeen = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    InternalUserId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    NotificationTypeId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    InternalRoleId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CreatedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: false),
                    CreatedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: false),
                    ModificationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    ModifiedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    ModifiedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    IsDeactivated = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DeactivationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DeactivatedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    DeactivatedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    IsDeleted = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DeletedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    DeletedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_InternalRoles_InternalRoleId",
                        column: x => x.InternalRoleId,
                        principalTable: "InternalRoles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_InternalUsers_InternalUserId",
                        column: x => x.InternalUserId,
                        principalTable: "InternalUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_NotificationTypes_NotificationTypeId",
                        column: x => x.NotificationTypeId,
                        principalTable: "NotificationTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Checks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Amount = table.Column<double>(type: "BINARY_DOUBLE", nullable: false),
                    BankId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    BranchId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ServiceId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CheckNumber = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    LotNumber = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    RecipientName = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    SinisterNumber = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    AccountNumber = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    RegisterOrderNumber = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    TransactionNumber = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    BeneficiaryName = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CreatedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: false),
                    CreatedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: false),
                    ModificationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    ModifiedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    ModifiedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    IsDeactivated = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DeactivationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DeactivatedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    DeactivatedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    IsDeleted = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DeletedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    DeletedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Checks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Checks_Banks_BankId",
                        column: x => x.BankId,
                        principalTable: "Banks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Checks_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Checks_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Timelines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CheckId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    UserId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    StatusId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ReasonLabel = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CreatedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: false),
                    CreatedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: false),
                    ModificationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    ModifiedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    ModifiedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    IsDeactivated = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DeactivationDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DeactivatedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    DeactivatedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    IsDeleted = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DeletedById = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true),
                    DeletedByFullName = table.Column<string>(type: "NVARCHAR2(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timelines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Timelines_Checks_CheckId",
                        column: x => x.CheckId,
                        principalTable: "Checks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Timelines_InternalUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "InternalUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Timelines_Statuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Statuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Checks_BankId",
                table: "Checks",
                column: "BankId");

            migrationBuilder.CreateIndex(
                name: "IX_Checks_BranchId",
                table: "Checks",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Checks_ServiceId",
                table: "Checks",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalUserInternalRoles_InternalRoleId",
                table: "InternalUserInternalRoles",
                column: "InternalRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalUserInternalRoles_InternalUserId",
                table: "InternalUserInternalRoles",
                column: "InternalUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_InternalRoleId",
                table: "Notifications",
                column: "InternalRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_InternalUserId",
                table: "Notifications",
                column: "InternalUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_NotificationTypeId",
                table: "Notifications",
                column: "NotificationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Timelines_CheckId",
                table: "Timelines",
                column: "CheckId");

            migrationBuilder.CreateIndex(
                name: "IX_Timelines_StatusId",
                table: "Timelines",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Timelines_UserId",
                table: "Timelines",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InternalUserInternalRoles");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Timelines");

            migrationBuilder.DropTable(
                name: "InternalRoles");

            migrationBuilder.DropTable(
                name: "NotificationTypes");

            migrationBuilder.DropTable(
                name: "Checks");

            migrationBuilder.DropTable(
                name: "InternalUsers");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "Banks");

            migrationBuilder.DropTable(
                name: "Branchs");

            migrationBuilder.DropTable(
                name: "Services");
        }
    }
}
