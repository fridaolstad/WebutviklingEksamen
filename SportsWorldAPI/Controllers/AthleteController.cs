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
    
// Get all - vise alle utøvere - side 1
[HttpGet]
public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await _sportsWorldContext.Athletes.ToListAsync();
            return Ok(athletes); // Returnerer athletes til fronted

        }
        catch
        {
            return StatusCode(500);
        }
    }
  

// Get by id - søke etter utøver etter id - side 1
[HttpGet("{id}")] // endepunktet blir /api/Athlete/id
public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            Athlete? athlete = await _sportsWorldContext.Athletes
            .FindAsync(id);
            if(athlete != null)
            {
                return Ok(athlete); // Statuskode 200
            }
            else
            {
                return NotFound("Athlete med iden ble ikke funnet"); // Statuskode 404
            }

        }
        catch
        {
            return StatusCode(500);
        }
    }

// Get by name - hente etter noe annet enn id - side 1

[HttpGet]
[Route("[action]/{name}")] 
public async Task<ActionResult<List<Athlete>>> GetByName(string name)
    {
        try
        {
            // Sjekker at søkefeltet ikke kan være tomt:
            if(string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Tekstfeltet er null eller har invalid characters");
            }
            List<Athlete> athletes = await _sportsWorldContext.Athletes
            .Where(
                athlete => athlete.Name != null && athlete.Name.ToLower().Contains(
                    name.ToLower()
                    // Vi prøvde først med StringComparison.CurrentCultureIgnoreCase, men dette funket dessverre ikke sånn 
                    // som vi ønsket. Derfor valgte vi å bruke .ToLower().Contains(name.ToLower() som tar navnet til spilleren
                    // i databasen og konverterer det til små bokstaver og sjekker om navnet inneholder søkeordet
                    // dokumentasjon for bruk av dette kan finnes på https://learn.microsoft.com/en-us/ef/core/querying/client-eval
                    // under "Client evaluation in the top-level projection" 
                )
            )
            .ToListAsync();
            return Ok(athletes);

        }
        catch(Exception)
        {
            return StatusCode(500, "feil fra serveren");
        }
    }

// PUT / UPDATE - redigere eksisterende athlete - side 1
[HttpPut]
public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        // Sjekker om brukeren sender inn et gyldig objekt
        if(editedAthlete != null)
        {
            try
            {
                // Context gjøres klar for å gjøre endring på redigert athlete; Context greier å finne den igjen basert på id'en til athleten
                _sportsWorldContext.Athletes.Entry(editedAthlete).State = EntityState.Modified;
                // Utfører lagringen
                await _sportsWorldContext.SaveChangesAsync();
                return NoContent(); // 200-melding som betyr at det gikk bra og at det ikke er nødvendig med noe tilbake

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



// Delete -  slette utøver
[HttpDelete("{id}")] // sletter etter id på athlete, /api/Athlete/id
public async Task<IActionResult> Delete (int id)
    {
        try
        {
            // Søker i databsen om den finner en utøver som matcher den gitte iden
            Athlete? athlete = await _sportsWorldContext.Athletes.FindAsync(id);
            
            if (athlete == null)
            {
                return NotFound();
            }

            // Sjekker om spilleren er kjøpt 
            if (athlete.PurchaseStatus)
            {
                Finance finance = await _sportsWorldContext.Finances.FirstAsync();

                // Reduserer antall kjøp i financeobjektet
                finance.NumberOfPurchases --;
            }

                // Forteller context at athlete skal fjernes
                _sportsWorldContext.Athletes.Remove(athlete);

                // Lagrer alle endringene 
                await _sportsWorldContext.SaveChangesAsync();

                return NoContent(); 

        }
        catch
        {
            return StatusCode(500, "Server error"); 
        }
    }


// Post - registrere ny athlete  - side 2
[HttpPost]
public async Task<ActionResult<Athlete>> Post(Athlete athlete)
    {
        // Sjekker at athlete objektet ikke er null og at name og image feltene er fylt ut 
        if(athlete != null 
        && !string.IsNullOrWhiteSpace(athlete.Name)
        && !string.IsNullOrWhiteSpace(athlete.Image))
        {

        try
        {
            // Setter deafult status til false (ikke kjøpt) for ny spiller 
            athlete.PurchaseStatus = false;

            // Forteller context at athlete skal legges til 
            _sportsWorldContext.Athletes.Add(athlete);

            // Lagrer endringen i databasen
            await _sportsWorldContext.SaveChangesAsync();
            
            return Created(); // Statuskode 201 

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

}
