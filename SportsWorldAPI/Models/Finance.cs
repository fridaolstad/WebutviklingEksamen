using System.ComponentModel.DataAnnotations.Schema;
using SportsWorldAPI.Interfaces;

namespace SportsWorldAPI.Models;

public class Finance : IFinance
{
    public int Id { get; set; }
    public double MoneyLeft { get; set; }
    public int NumberOfPurchases { get; set; }
    public double MoneySpent { get; set; }

    // Oppstod hinder her, så har valgt å bruke denne teknikken for å unngå lagring i databasen: https://www.learnentityframeworkcore.com/configuration/data-annotation-attributes/notmapped-attribute 
    [NotMapped]
    public double Amount { get; set; }
    [NotMapped]
    public double Price { get; set; }
}
