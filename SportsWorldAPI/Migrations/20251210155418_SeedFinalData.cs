using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SportsWorldAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedFinalData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "Athletes",
                columns: new[] { "Id", "Gender", "Image", "Name", "Price", "PurchaseStatus" },
                values: new object[,]
                {
                    { 1, "Male", "messi.jpg", "Lionel Messi", 80000000.0, false },
                    { 2, "Female", "graham_hansen.jpg", "Caroline Graham Hansen", 50000000.0, false },
                    { 3, "Male", "odegaard.jpg", "Martin Ødegaard", 90000000.0, false },
                    { 4, "Female", "putellas.jpg", "Alexia Putellas", 60000000.0, false },
                    { 5, "Male", "haaland.jpg", "Erling Braut Haaland", 150000000.0, false },
                    { 6, "Female", "aitana.jpg", "Aitana Bonmati", 40000000.0, false },
                    { 7, "Male", "modric.jpg", "Luka Modric", 70000000.0, false },
                    { 8, "Male", "lewandowski.jpg", "Robert Lewandowski", 80000000.0, false }
                });

            migrationBuilder.InsertData(
                table: "Finances",
                columns: new[] { "Id", "Amount", "MoneyLeft", "MoneySpent", "NumberOfPurchases", "Price" },
                values: new object[,]
                {
                    { 1, 0.0, 1000000000.0, 0.0, 0, 0.0 },
                    { 2, 0.0, 0.0, 50000000.0, 1, 0.0 },
                    { 3, 0.0, 0.0, 150000000.0, 3, 0.0 },
                    { 4, 0.0, 0.0, 0.0, 0, 0.0 },
                    { 5, 0.0, 0.0, 90000000.0, 2, 0.0 },
                    { 6, 0.0, 0.0, 220000000.0, 4, 0.0 },
                    { 7, 0.0, 0.0, 70000000.0, 1, 0.0 },
                    { 8, 0.0, 0.0, 300000000.0, 5, 0.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Finances");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Finances");
        }
    }
}
