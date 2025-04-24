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
            migrationBuilder.DropForeignKey(
                name: "FK_Checkes_Banks_BankId",
                table: "Checkes");

            migrationBuilder.DropForeignKey(
                name: "FK_Checkes_Branchs_BranchId",
                table: "Checkes");

            migrationBuilder.DropForeignKey(
                name: "FK_Checkes_Services_ServiceId",
                table: "Checkes");

            migrationBuilder.DropForeignKey(
                name: "FK_Timelines_Checkes_CheckId",
                table: "Timelines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Checkes",
                table: "Checkes");

            migrationBuilder.RenameTable(
                name: "Checkes",
                newName: "Checks");

            migrationBuilder.RenameIndex(
                name: "IX_Checkes_ServiceId",
                table: "Checks",
                newName: "IX_Checks_ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Checkes_BranchId",
                table: "Checks",
                newName: "IX_Checks_BranchId");

            migrationBuilder.RenameIndex(
                name: "IX_Checkes_BankId",
                table: "Checks",
                newName: "IX_Checks_BankId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Checks",
                table: "Checks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Checks_Banks_BankId",
                table: "Checks",
                column: "BankId",
                principalTable: "Banks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Checks_Branchs_BranchId",
                table: "Checks",
                column: "BranchId",
                principalTable: "Branchs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Checks_Services_ServiceId",
                table: "Checks",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Timelines_Checks_CheckId",
                table: "Timelines",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Checks_Banks_BankId",
                table: "Checks");

            migrationBuilder.DropForeignKey(
                name: "FK_Checks_Branchs_BranchId",
                table: "Checks");

            migrationBuilder.DropForeignKey(
                name: "FK_Checks_Services_ServiceId",
                table: "Checks");

            migrationBuilder.DropForeignKey(
                name: "FK_Timelines_Checks_CheckId",
                table: "Timelines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Checks",
                table: "Checks");

            migrationBuilder.RenameTable(
                name: "Checks",
                newName: "Checkes");

            migrationBuilder.RenameIndex(
                name: "IX_Checks_ServiceId",
                table: "Checkes",
                newName: "IX_Checkes_ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Checks_BranchId",
                table: "Checkes",
                newName: "IX_Checkes_BranchId");

            migrationBuilder.RenameIndex(
                name: "IX_Checks_BankId",
                table: "Checkes",
                newName: "IX_Checkes_BankId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Checkes",
                table: "Checkes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Checkes_Banks_BankId",
                table: "Checkes",
                column: "BankId",
                principalTable: "Banks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Checkes_Branchs_BranchId",
                table: "Checkes",
                column: "BranchId",
                principalTable: "Branchs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Checkes_Services_ServiceId",
                table: "Checkes",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Timelines_Checkes_CheckId",
                table: "Timelines",
                column: "CheckId",
                principalTable: "Checkes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
