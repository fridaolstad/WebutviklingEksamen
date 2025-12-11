import { useRef, useContext, useState } from "react";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../context/AthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";

// vise alle, og søke etter navn

const AthleteForm = () => {

    // koble til contexten
    const {searchAthleteByName, showAllAthletes} = useContext (AthleteContext) as IAthleteContext;

    const searchInput = useRef<HTMLInputElement | null> (null);

    // state for å vise status og tilbakemeldinger
    const [statusMessage, setStatusMessage] = useState(""); 



      // react stantard: onClick, onCance = bruke handle i navnet
      const handleSearch = async () => {

        if(searchInput.current && searchInput.current.value.trim() != ""){

            const searchWord = searchInput.current.value.trim();
            setStatusMessage( `søker etter: ${searchWord}...`);

            const response = await searchAthleteByName(searchWord);

            if(response.success && response.data !== null){
                if(response.data?.length)
                setStatusMessage (`Her er spilleren med naven ${searchWord}: ${response.data?.length}`); 

            }else {
                setStatusMessage (` Feil under søking.. prøv på nytt`)
            }

        } else {
            setStatusMessage ("skriv inn navnet du vil søke")
        }
      }


      const handeShowAll = async () => {
        setStatusMessage("henter alle utøvere...")
        
        const response = await showAllAthletes();

        // kan gjøre denne om til en if, if/else og else?
        if(response.success && response.data !== null){


            // sjekker om det er et array?
            if(Array.isArray(response.data)){
                const athletes = response.data;

                // sjekker om det innholder noe
                if(athletes.length > 0){
                    setStatusMessage(`viser alle ${athletes.length} spillere`)
                }else{
                    setStatusMessage("ingen spillere funnet i databasen");
                }
            }

            // tømmer søkefeltet (etter søk?)
            if (searchInput.current){
                searchInput.current.value = "";
            }
        } else {
            setStatusMessage ("klarte ikke hente alle utøvere");
        }
      };

      return(
        <section className="bg-gray-200 p-6 rounded-lg shadow-md mb-8">

            <header className="mb-4">
                <h3 className="text-2xl font-semibold"> Søke etter navn på spiller </h3>
            </header>
            

            {/* inputfeltet for søk */}
            <div className="flex space-x-3">
                <label>Navn: </label>
                <input ref={searchInput} className="border border-black rounded-lg" type="text" />

                <button onClick={handleSearch} className="border border-black px-2 "> Søk </button>
                 {/* vise alle knapper */}
                <button onClick={handeShowAll} className="border border-black px-2" > vis alle </button>
            </div>
            
            <div >
              <p> Status: {statusMessage}</p>

            </div>
            
        </section>
      )
}

export default AthleteForm;
