using System.ComponentModel.DataAnnotations.Schema;
using SportsWorldAPI.Interfaces;

namespace SportsWorldAPI.Models;

public class Finance : IFinance
{
    public int Id { get; set; }
    public double MoneyLeft { get; set; }
    public int NumberOfPurchases { get; set; }
    public double MoneySpent { get; set; }

    // Vi har valgt å legge Amount og Price i Finance fordi de brukes som midlertidige verdier som kommer fra frontend ved api-kall. 
    // Vi har derfor valgt å bruke [NotMapped] fordi disse to verdiene ikke er data som skal lagres i databasen (brukes bare når 
    // penger legges til og trekkes fra). Ved å bruke [NotMapped] prøver ikke Entity Framework å lagre dem som kolonner i databsen vår.
    // her er kilde til for bruk av teknikken: 
    //https://learn.microsoft.com/en-us/ef/core/modeling/entity-properties?tabs=data-annotations%2Cwith-nrt#included-and-excluded-properties

    [NotMapped]
    public double Amount { get; set; }
    [NotMapped]
    public double Price { get; set; }
    
}
