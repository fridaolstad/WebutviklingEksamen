namespace SportsWorldAPI.Interfaces;


interface IFinance 
{
    int Id { get; set; }
    double MoneyLeft { get; set; }
    int NumberOfPurchases { get; set; }
    double MoneySpent { get; set; }
}