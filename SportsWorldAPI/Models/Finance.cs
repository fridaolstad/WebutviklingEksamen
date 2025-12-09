using SportsWorldAPI.Interfaces;

namespace SportsWorldAPI.Models;

public class Finance : IFinance
{
    public int Id { get; set; }
    public double MoneyLeft { get; set; }
    public int NumberOfPurchases { get; set; }
    public double MoneySpent { get; set; }

    public double Amount { get; set; }
    public double Price { get; set; }
}