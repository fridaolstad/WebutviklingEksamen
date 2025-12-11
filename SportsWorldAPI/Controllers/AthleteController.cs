using Microsoft.AspNetCore.Mvc;
using SportsWorldAPI.Context;
using SportsWorldAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AthleteController(SportsWorldContext _sportsWorldContext): ControllerBase
{
    
// get all - vise alle utøvere - side 1
[HttpGet]
public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await _sportsWorldContext.Athletes.ToListAsync();
            return Ok(athletes); // returnerer athletes til fronted

        }
        catch
        {
            return StatusCode(500);
        }
    }
  

// get by id - søke etter utøver etter id - side 1
[HttpGet("{id}")] // endepunktet blir /api/Athlete/id?
public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            Athlete? athlete = await _sportsWorldContext.Athletes
            .FindAsync(id);
            if(athlete != null)
            {
                return Ok(athlete); // statuskode 200
            }
            else
            {
                return NotFound("Athlete med iden ble ikke funnet"); // statuskode 404
            }

        }
        catch
        {
            return StatusCode(500);
        }
    }

// get by name - hente etter noe annet enn id - side 1

[HttpGet]
[Route("[action]/{name}")] // endepunktet blir da /api/Athlete/byname/NAVNETFEKSMESSI
public async Task<ActionResult<List<Athlete>>> GetByName(string name)
    {
        try
        {
            // sjekker at søkefeltet ikke kan være tomt:
            if(string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Tekstfeltet er null eller har invalid characters");
            }
            // kode fra pp til Rolando:
            List<Athlete> athletes = await _sportsWorldContext.Athletes
            .Where(
                athlete => athlete.Name != null && athlete.Name.ToLower().Contains(
                    name.ToLower()
                    //StringComparison.CurrentCultureIgnoreCase
                )
            )
            .ToListAsync();
            return Ok(athletes);

            /* må ikke ha med denne ifen: 
            if(athletes == null || athletes.Count == 0)
            {
                return NotFound("Ingen utøver funnet med dette navnet");
            }
            return Ok(athletes);
            */
        }
        catch(Exception e)
        {
        Console.WriteLine($"Serverfeil ved GetByName: {e.Message}");
        Console.WriteLine($"Detaljer: {e.StackTrace}"); // Kan gi mer detaljer
            return StatusCode(500, "feil fra serveren");
        }
    }

// PUT / UPDATE - redigere eksisterende athlete - side 1
[HttpPut]
public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        // sjekker om brukeren sender inn et gyldig objekt
        if(editedAthlete != null)
        {
            try
            {
                // Context gjøres klar for å gjøre endring på redigert athlete; Context greier å finne den igjen basert på id'en til athleten. -Rolando
                _sportsWorldContext.Athletes.Entry(editedAthlete).State = EntityState.Modified;
                // Utfører lagringen
                await _sportsWorldContext.SaveChangesAsync();
                // NoContent er en 200-melding som betyr at det gikk bra og at det ikke er nødvendig med noe tilbake. -Rolando
                return NoContent();

            }
            catch
            {
                return StatusCode(500);
            }
        }
        else
        {
            return BadRequest();
        }
      
    }



// delete -  slette utøver
[HttpDelete("{id}")] // sletter etter id på athlete, /api/Athlete/id
public async Task<IActionResult> Delete (int id)
    {
        try
        {
            // søker i databsen om den finner en utøver med matcher den gitte iden, resutatet kan være null (?), ? fordi det er ikke sikkert det er en Athlete vi får tak i 
            Athlete? athlete = await _sportsWorldContext.Athletes.FindAsync(id);
            // sjekker om athleten ble funnet i databasen
            if (athlete != null)
            {
                // forteller at dette objektet skal fjernes fra databsen
                _sportsWorldContext.Athletes.Remove(athlete);
                // selve slettingen, sender slette forespørsel til databasen
                await _sportsWorldContext.SaveChangesAsync();

                return NoContent();
            }
            else
            {
                return NotFound();
            }

        }
        catch
        {
            return StatusCode(500, "Server error"); 
        }
    }


// post - registrere ny athlete  - side 2
[HttpPost]
public async Task<ActionResult<Athlete>> Post(Athlete athlete)
    {
        if(athlete != null 
        && !string.IsNullOrWhiteSpace(athlete.Name)
        && !string.IsNullOrWhiteSpace(athlete.Image))
        {

        try
        {
            athlete.PurchaseStatus = false;

            _sportsWorldContext.Athletes.Add(athlete);
            await _sportsWorldContext.SaveChangesAsync();
            return Created();

        }
        catch
        {
            return StatusCode(500);
        }

        }
        else
        {
            return BadRequest();
        }
        
    }

    // til Finance - kjøpe utøver
    [HttpPost("purchase")]
    public async Task<ActionResult> PurchaseAthlete(int athleteId)
    {

        try
        {
            // finne utøver
            Athlete? athlete = await _sportsWorldContext.Athletes.FindAsync(athleteId);
            if(athlete == null)
                return NotFound("Finner ikke utøver");
            
            //Hvis utøveren er kjøpt fra før
            if(athlete.PurchaseStatus)
                return BadRequest("Utøver er allerede kjøpt");
            
            // finne finance
            Finance? finance = await _sportsWorldContext.Finances.FirstOrDefaultAsync();
            if (finance == null)
                return NotFound("Ikke funnet");

            if (finance.MoneyLeft < athlete.Price)
                return BadRequest("Ikke nok penger til å kjøpe denne utøveren");

            athlete.PurchaseStatus = true;
            finance.MoneyLeft -= athlete.Price;
            finance.MoneySpent += athlete.Price;
            finance.NumberOfPurchases++;

            await _sportsWorldContext.SaveChangesAsync();

            return Ok(new {athlete, finance});
            
        }
        catch
        {
            return StatusCode(500);
        }
        

    }


}





// BARE OM TID: legge til find eller filter by gender, og purchased? 


// CREATE er POST
// UPDATE er PUT

// 200 koder er bra 
// 400 koder er at det er noe galt i frontenden (noe brukeren har gjort)
// 500 koder er server feil 