using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Context;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("api/[controller]")]


// Henter første rad fra Finance fra db
public class FinanceController(SportsWorldContext _financeContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Finance>> Get()
    {
        try
        {
            // Henter første objekt        
            var finance = await _financeContext.Finances.FirstAsync();
            
            // Hvis alt Ok, returner objektet
            return Ok(finance);
        }
        catch
        {
            // Catch for eventuell uventet feil
            return StatusCode(500);
        }
    }

    [HttpPost("addmoney")] //for å unngå kollidering i endepunktet
    public async Task<ActionResult> AddMoney(Finance financeFromFrontend)
    {
        try
        {
            var finance = await _financeContext.Finances.FirstAsync();

            // Øking av beløpå fra frontend
            finance.MoneyLeft += financeFromFrontend.Amount;
            // Lagring av endringene
            await _financeContext.SaveChangesAsync();
            // hvis ok, returner det oppdaterte objektet
            return Ok(finance);

        }
        catch
        {
            // Catch for eventuell uventet feil
            return StatusCode(500);
        }
    }


    
    [HttpPost("purchase")]
    public async Task<ActionResult> Purchase(Finance financeFromFrontend)
    {
        try
        {
            var finance = await _financeContext.Finances.FirstAsync();

            // Trekkning av beløp fra tilgjengelig beløp på konto
            finance.MoneyLeft -= financeFromFrontend.Price;
            // Øker totale utgifter
            finance.MoneySpent += financeFromFrontend.Price;
            // Øker antall kjøpte utøvere
            finance.NumberOfPurchases++;

            // Oppdaterer endringer
            await _financeContext.SaveChangesAsync();
            return Ok(finance);
        }
        catch
        {
            // Catch for eventuell uventet feil
            return StatusCode(500);
        }
    }

}


