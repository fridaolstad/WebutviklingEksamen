using SportsWorldAPI.Interfaces;

namespace SportsWorldAPI.Models;

public class Athlete : IAthlete
{
    public int Id{get; set; }
    public string Name {get; set; } = String.Empty;
    public string Gender {get; set;} = String.Empty;
    public double Price {get; set; }
    public string Image {get; set; } = String.Empty;
    public bool PurchaseStatus {get; set; }
}