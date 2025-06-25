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
            migrationBuilder.AddColumn<string>(
                name: "To",
                table: "ReasonMoves",
                type: "NVARCHAR2(2000)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Timelines_ReasonMoveId",
                table: "Timelines",
                column: "ReasonMoveId");

            migrationBuilder.AddForeignKey(
                name: "FK_Timelines_ReasonMoves_ReasonMoveId",
                table: "Timelines",
                column: "ReasonMoveId",
                principalTable: "ReasonMoves",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Timelines_ReasonMoves_ReasonMoveId",
                table: "Timelines");

            migrationBuilder.DropIndex(
                name: "IX_Timelines_ReasonMoveId",
                table: "Timelines");

            migrationBuilder.DropColumn(
                name: "To",
                table: "ReasonMoves");
        }
    }
}
