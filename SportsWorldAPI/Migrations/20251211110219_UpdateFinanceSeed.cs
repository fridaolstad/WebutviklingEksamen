using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SportsWorldAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFinanceSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.UpdateData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 1,
                column: "PurchaseStatus",
                value: true);

            migrationBuilder.UpdateData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 2,
                column: "PurchaseStatus",
                value: true);

            migrationBuilder.UpdateData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 5,
                column: "PurchaseStatus",
                value: true);

            migrationBuilder.UpdateData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 8,
                column: "PurchaseStatus",
                value: true);

            migrationBuilder.UpdateData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "MoneyLeft", "MoneySpent", "NumberOfPurchases" },
                values: new object[] { 640000000.0, 360000000.0, 4 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 1,
                column: "PurchaseStatus",
                value: false);

            migrationBuilder.UpdateData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 2,
                column: "PurchaseStatus",
                value: false);

            migrationBuilder.UpdateData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 5,
                column: "PurchaseStatus",
                value: false);

            migrationBuilder.UpdateData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 8,
                column: "PurchaseStatus",
                value: false);

            migrationBuilder.UpdateData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "MoneyLeft", "MoneySpent", "NumberOfPurchases" },
                values: new object[] { 1000000000.0, 0.0, 0 });

            migrationBuilder.InsertData(
                table: "Finances",
                columns: new[] { "Id", "Amount", "MoneyLeft", "MoneySpent", "NumberOfPurchases", "Price" },
                values: new object[,]
                {
                    { 2, 0.0, 0.0, 50000000.0, 1, 0.0 },
                    { 3, 0.0, 0.0, 150000000.0, 3, 0.0 },
                    { 4, 0.0, 0.0, 0.0, 0, 0.0 },
                    { 5, 0.0, 0.0, 90000000.0, 2, 0.0 },
                    { 6, 0.0, 0.0, 220000000.0, 4, 0.0 },
                    { 7, 0.0, 0.0, 70000000.0, 1, 0.0 },
                    { 8, 0.0, 0.0, 300000000.0, 5, 0.0 }
                });
        }
    }
}
