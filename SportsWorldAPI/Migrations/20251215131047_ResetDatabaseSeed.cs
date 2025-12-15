using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportsWorldAPI.Migrations
{
    /// <inheritdoc />
    public partial class ResetDatabaseSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Finances");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Finances");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "Finances",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Finances",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Amount", "Price" },
                values: new object[] { 0.0, 0.0 });
        }
    }
}
