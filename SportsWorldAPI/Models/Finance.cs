using System.ComponentModel.DataAnnotations.Schema;
using SportsWorldAPI.Interfaces;

namespace SportsWorldAPI.Models;

public class Finance : IFinance
{
    public int Id { get; set; }
    public double MoneyLeft { get; set; }
    public int NumberOfPurchases { get; set; }
    public double MoneySpent { get; set; }

    // Oppstod hinder her, så har valgt å bruke denne teknikken for å unngå lagring i databasen:
    //https://learn.microsoft.com/en-us/ef/core/modeling/entity-properties?tabs=data-annotations%2Cwith-nrt#included-and-excluded-properties

    // Vi har valgt å legge Amount og Price i Finance fordi de brukes som midlertidige verdier (feks hvor my penger brukeren vil legge
    //til og hva et kjøp koster) som kommer fra frontend ved api-kall. Vi har derfor vaøgt å bruke [NotMapped] fordi disse to verdiene
    // ikke er data som skal lagres i databasen (brukes bare når )

    [NotMapped]
    public double Amount { get; set; }
    [NotMapped]
    public double Price { get; set; }
    
}
