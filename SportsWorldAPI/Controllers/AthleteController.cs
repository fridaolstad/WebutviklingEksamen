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
            
            if (athlete == null)
            {
                return NotFound();
            }

            // sjekker om spilleren er kjøpt 
            if (athlete.PurchaseStatus)
            {
                Finance finance = await _sportsWorldContext.Finances.FirstAsync();

                // reduserer antall kjøp i financeobjektet
                finance.NumberOfPurchases --;
            }

                // forteller context at athlete skal fjernes
                _sportsWorldContext.Athletes.Remove(athlete);

                // lagrer alle endringene 
                await _sportsWorldContext.SaveChangesAsync();

                return NoContent(); // finne kilde på denne

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

}
