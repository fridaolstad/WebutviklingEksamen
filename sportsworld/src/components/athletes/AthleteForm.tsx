import { useRef, useContext, useState } from "react";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../context/AthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";

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
                setStatusMessage (`her er utøvere med naven ${searchWord}: ${response.data?.length}`); 

            }else {
                setStatusMessage (` feil under søking.. prøv på nytt}`)
            }

        } else {
            setStatusMessage ("skriv inn navnet du vil søke")
        }
      }

      // usikker på om denne skal ligge her eller i list.. chat sier her

      const handeShowAll = async () => {
        setStatusMessage("henter alle utøvere...")
        
        const response = await showAllAthletes();

        if(response.success){
            setStatusMessage(`viser alle utøvere: ${response.data}`);

            // tømmer søkefeltet (etter søk?)
            if (searchInput.current){
                searchInput.current.value = "";
            }
        } else {
            setStatusMessage ("klarte ikke hente alle utøvere");
        }
      };

      return(
        <section className="p-3 border mb-3">
            <h3 className="text-xl"> Administrasjon: søke</h3>

            {/* inputfeltet for søk */}
            <div>
                <label>Navn</label>
                <input ref={searchInput} className="border" type="text" > </input>
            </div>
            <button onClick={handleSearch} className="border px-2"> Søk </button>
           
             {/* vise alle knapper */}
             <button onClick={handeShowAll} className="border px-2" > vis alle </button>

              <p> Status: {statusMessage}</p>
        </section>
      )
}

export default AthleteForm;
