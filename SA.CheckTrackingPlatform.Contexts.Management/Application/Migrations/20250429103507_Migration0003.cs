using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SA.CheckTrackingPlatform.Contexts.Management.Application.Migrations
{
    /// <inheritdoc />
    public partial class Migration0003 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedByFullName",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "DeactivatedByFullName",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "DeactivatedById",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "DeactivationDate",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "DeletedByFullName",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "DeletedById",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "DeletionDate",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "IsDeactivated",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "ModificationDate",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "ModifiedByFullName",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "InternalUserInternalRoles");

            migrationBuilder.DropColumn(
                name: "CreatedByFullName",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "DeactivatedByFullName",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "DeactivatedById",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "DeactivationDate",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "DeletedByFullName",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "DeletedById",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "DeletionDate",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "IsDeactivated",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "ModificationDate",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "ModifiedByFullName",
                table: "InternalRoles");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "InternalRoles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedByFullName",
                table: "InternalUserInternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "InternalUserInternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "InternalUserInternalRoles",
                type: "TIMESTAMP(7)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeactivatedByFullName",
                table: "InternalUserInternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeactivatedById",
                table: "InternalUserInternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeactivationDate",
                table: "InternalUserInternalRoles",
                type: "TIMESTAMP(7)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedByFullName",
                table: "InternalUserInternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedById",
                table: "InternalUserInternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionDate",
                table: "InternalUserInternalRoles",
                type: "TIMESTAMP(7)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsDeactivated",
                table: "InternalUserInternalRoles",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IsDeleted",
                table: "InternalUserInternalRoles",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModificationDate",
                table: "InternalUserInternalRoles",
                type: "TIMESTAMP(7)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedByFullName",
                table: "InternalUserInternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedById",
                table: "InternalUserInternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedByFullName",
                table: "InternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "InternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "InternalRoles",
                type: "TIMESTAMP(7)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeactivatedByFullName",
                table: "InternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeactivatedById",
                table: "InternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeactivationDate",
                table: "InternalRoles",
                type: "TIMESTAMP(7)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedByFullName",
                table: "InternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedById",
                table: "InternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionDate",
                table: "InternalRoles",
                type: "TIMESTAMP(7)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsDeactivated",
                table: "InternalRoles",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IsDeleted",
                table: "InternalRoles",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModificationDate",
                table: "InternalRoles",
                type: "TIMESTAMP(7)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedByFullName",
                table: "InternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedById",
                table: "InternalRoles",
                type: "NVARCHAR2(40)",
                maxLength: 40,
                nullable: true);
        }
    }
}
