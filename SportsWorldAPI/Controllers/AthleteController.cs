using Microsoft.AspNetCore.Mvc;
using SportsWorldAPI.Context;
using SportsWorldAPI.Models;
using Microsoft.EntityFrameworkCore;

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
                athlete => athlete.Name.Contains(
                    name,
                    StringComparison.CurrentCultureIgnoreCase
                )
            )
            .ToListAsync();
            return athletes;

            /* må ikke ha med denne ifen: 
            if(athletes == null || athletes.Count == 0)
            {
                return NotFound("Ingen utøver funnet med dette navnet");
            }
            return Ok(athletes);
            */
        }
        catch
        {
            return StatusCode(500, "feil fra serveren");
        }
    }

// PUT / UPDATE - redigere eksisterende athlete - side 1
[HttpPut]
public async Task<IActionResult> Put(Athlete editedAthlete)
    {
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
        // ha else her og return inni?
        return BadRequest();
    }
// TODO: 
// delete -  slette utøver









// post - registrere ny athlete - side 2

/*
[HttpPost]
public async Task<ActionResult<Athlete>> Post(Athlete athlete)
    {
        try
        {

        }
        catch
        {
            return StatusCode(500);
        }
        
    }

*/



}




// BARE OM TID: legge til find eller filter by gender, og purchased? 


// CREATE er POST
// UPDATE er PUT


//? fordi det er ikke sikkert det er en Athlete vi får tak i 
// 200 koder er bra 
// 400 koder er at det er noe galt i frontenden (noe brukeren har gjort)
// 500 koder er server feil 