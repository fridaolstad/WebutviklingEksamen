using System.ComponentModel.DataAnnotations.Schema;
using SportsWorldAPI.Interfaces;

namespace SportsWorldAPI.Models;

public class Finance : IFinance
{
    public int Id { get; set; }
    public double MoneyLeft { get; set; }
    public int NumberOfPurchases { get; set; }
    public double MoneySpent { get; set; }

    [NotMapped]
    public double Amount { get; set; }
    [NotMapped]
    public double Price { get; set; }
}