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
            migrationBuilder.EnsureSchema(
                name: "core");

            migrationBuilder.EnsureSchema(
                name: "referential");

            migrationBuilder.EnsureSchema(
                name: "authority");

            migrationBuilder.CreateTable(
                name: "Checkes",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    CreatedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    ModificationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    ModifiedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    IsDeactivated = table.Column<bool>(type: "bit", nullable: false),
                    DeactivationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeactivatedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    DeactivatedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    DeletedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Checkes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InternalRoles",
                schema: "referential",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Label = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    CreatedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    ModificationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    ModifiedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    IsDeactivated = table.Column<bool>(type: "bit", nullable: false),
                    DeactivationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeactivatedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    DeactivatedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    DeletedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InternalUsers",
                schema: "authority",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(19)", maxLength: 19, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    ElectronicAddress = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: false),
                    ParentInternalUserId = table.Column<int>(type: "int", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    CreatedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    ModificationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    ModifiedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    IsDeactivated = table.Column<bool>(type: "bit", nullable: false),
                    DeactivationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeactivatedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    DeactivatedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    DeletedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InternalUsers_InternalUsers_ParentInternalUserId",
                        column: x => x.ParentInternalUserId,
                        principalSchema: "authority",
                        principalTable: "InternalUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "InternalUserBranchPartners",
                schema: "authority",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InternalUserId = table.Column<int>(type: "int", nullable: false),
                    ExternalBranchId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExternalPartnerUserCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WorkFlowStepCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    CreatedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    ModificationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    ModifiedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    IsDeactivated = table.Column<bool>(type: "bit", nullable: false),
                    DeactivationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeactivatedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    DeactivatedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedById = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    DeletedByFullName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalUserBranchPartners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InternalUserBranchPartners_InternalUsers_InternalUserId",
                        column: x => x.InternalUserId,
                        principalSchema: "authority",
                        principalTable: "InternalUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InternalUserInternalRoles",
                schema: "authority",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InternalUserId = table.Column<int>(type: "int", nullable: false),
                    InternalRoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalUserInternalRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InternalUserInternalRoles_InternalRoles_InternalRoleId",
                        column: x => x.InternalRoleId,
                        principalSchema: "referential",
                        principalTable: "InternalRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternalUserInternalRoles_InternalUsers_InternalUserId",
                        column: x => x.InternalUserId,
                        principalSchema: "authority",
                        principalTable: "InternalUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InternalUserBranchPartners_InternalUserId",
                schema: "authority",
                table: "InternalUserBranchPartners",
                column: "InternalUserId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalUserInternalRoles_InternalRoleId",
                schema: "authority",
                table: "InternalUserInternalRoles",
                column: "InternalRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalUserInternalRoles_InternalUserId",
                schema: "authority",
                table: "InternalUserInternalRoles",
                column: "InternalUserId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalUsers_ParentInternalUserId",
                schema: "authority",
                table: "InternalUsers",
                column: "ParentInternalUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Checkes",
                schema: "core");

            migrationBuilder.DropTable(
                name: "InternalUserBranchPartners",
                schema: "authority");

            migrationBuilder.DropTable(
                name: "InternalUserInternalRoles",
                schema: "authority");

            migrationBuilder.DropTable(
                name: "InternalRoles",
                schema: "referential");

            migrationBuilder.DropTable(
                name: "InternalUsers",
                schema: "authority");
        }
    }
}
