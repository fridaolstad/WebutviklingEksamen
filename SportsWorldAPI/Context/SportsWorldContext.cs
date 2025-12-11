using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Context;


public class SportsWorldContext(DbContextOptions<SportsWorldContext> options) : DbContext(options)
{
    public DbSet<Athlete> Athletes {get; set; }
    public DbSet<Finance> Finances {get; set; }

    // hvis tid, legge til venue

    // kilde til teknikkene brukt under er : https://learn.microsoft.com/en-us/ef/core/modeling/data-seeding#model-seed-data 
    // dette er konfigurasjonmetode for modellen, som gir oss tilgang til ModelBuilder, vi har valgt å bruke denne metoden 
    // framfor DatabaseSeeder, da det på Microsoft siden advarer fra å bruke denne teknikken da denne kan føre til problemer 
    // ("concurrency issues") når den kjøres, derfor har vi valgt å bruke Model managed data (HasData), da den er den anbefalte 
    // metoden for seeding av statiske, faste lister i et EF Core migrasjons-prosjekt (fra microsoft) 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Athlete>().HasData(
            new Athlete {Id = 1, Name = "Lionel Messi", Gender = "Male", Image = "messi.jpg", Price = 80000000, PurchaseStatus = true},
            new Athlete {Id = 2, Name = "Caroline Graham Hansen", Gender = "Female", Image = "graham_hansen.jpg", Price = 50000000, PurchaseStatus = true},
            new Athlete {Id = 3, Name = "Martin Ødegaard", Gender = "Male", Image = "odegaard.jpg", Price = 90000000, PurchaseStatus = false},
            new Athlete {Id = 4, Name = "Alexia Putellas", Gender = "Female", Image = "putellas.jpg", Price = 60000000, PurchaseStatus = false},
            new Athlete {Id = 5, Name = "Erling Braut Haaland", Gender = "Male", Image = "haaland.jpg", Price = 150000000, PurchaseStatus = true},
            new Athlete {Id = 6, Name = "Aitana Bonmati", Gender = "Female", Image = "aitana.jpg", Price = 40000000, PurchaseStatus = false},
            new Athlete {Id = 7, Name = "Luka Modric", Gender = "Male", Image = "modric.jpg", Price = 70000000, PurchaseStatus = false},
            new Athlete {Id = 8, Name = "Robert Lewandowski", Gender = "Male", Image = "lewandowski.jpg", Price = 80000000, PurchaseStatus = true}
        );

        modelBuilder.Entity<Finance>().HasData(
            new Finance {Id= 1, MoneyLeft= 640000000, NumberOfPurchases= 4, MoneySpent = 360000000, Amount = 0, Price= 0}
        );
    }
}


