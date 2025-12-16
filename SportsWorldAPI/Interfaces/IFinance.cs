namespace SportsWorldAPI.Interfaces;

// Definerer egenskaper for Finance-objekt
interface IFinance 
{
    int Id { get; set; }
    double MoneyLeft { get; set; }
    int NumberOfPurchases { get; set; }
    double MoneySpent { get; set; }
}