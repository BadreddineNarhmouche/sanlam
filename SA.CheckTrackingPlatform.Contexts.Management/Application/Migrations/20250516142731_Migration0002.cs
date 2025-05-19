using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SA.CheckTrackingPlatform.Contexts.Management.Application.Migrations
{
    /// <inheritdoc />
    public partial class Migration0002 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReasonLabel",
                table: "Timelines");

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Timelines",
                type: "NVARCHAR2(2000)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfPassage",
                table: "Timelines",
                type: "TIMESTAMP(7)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ReasonMoveId",
                table: "Timelines",
                type: "NUMBER(10)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReasonMoves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Code = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Label = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReasonMoves", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReasonMoves");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Timelines");

            migrationBuilder.DropColumn(
                name: "DateOfPassage",
                table: "Timelines");

            migrationBuilder.DropColumn(
                name: "ReasonMoveId",
                table: "Timelines");

            migrationBuilder.AddColumn<string>(
                name: "ReasonLabel",
                table: "Timelines",
                type: "NVARCHAR2(2000)",
                nullable: false,
                defaultValue: "");
        }
    }
}
