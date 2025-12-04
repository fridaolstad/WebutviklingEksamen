using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Context;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FinanceController(SportsWorldContext _financeContext) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<Finance>> Get()
    {
        try
        {
            var finance = await _financeContext.Finances.FirstOrDefaultAsync();
            if (finance == null)
                return NotFound();

            return Ok(finance);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost("addmoney")] //for å unngå kollidering i endepunktet
    public async Task<ActionResult> AddMoney(Finance financeFromFrontend) //eventuelt bruke [FromBody]?
    {
        try
        {
            var finance = await _financeContext.Finances.FirstOrDefaultAsync();
            if (finance == null)
            return NotFound();

            finance.MoneyLeft += financeFromFrontend.Amount;
            await _financeContext.SaveChangesAsync();
            return Ok(finance);

        }
        catch
        {
            return StatusCode(500);
        }
    }



    [HttpPost("purchase")]
    public async Task<ActionResult> Purchase(Finance financeFromFrontend)
    {
        try
        {
            var finance = await _financeContext.Finances.FirstOrDefaultAsync();
            if (finance == null)
            return NotFound();

            finance.MoneyLeft -= financeFromFrontend.Price;
            finance.MoneySpent += financeFromFrontend.Price;
            finance.NumberOfPurchases++;

            await _financeContext.SaveChangesAsync();
            return Ok(finance);
        }
        catch
        {
            return StatusCode(500);
        }
    }

}


