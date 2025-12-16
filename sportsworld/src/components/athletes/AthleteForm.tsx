import { useRef, useContext } from "react";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../context/AthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import { useClearStatusMessage } from "../hooks/UseClearStatusMessage";

// Vise alle, og søke etter navn

const AthleteForm = () => {

    const {searchAthleteByName, showAllAthletes} = useContext (AthleteContext) as IAthleteContext;

    const searchInput = useRef<HTMLInputElement | null> (null);
    const {statusMessage, isOk, updateStatusMessage} = useClearStatusMessage("Venter på handling...");
 
      const handleSearch = async () => {

        // Definerer søkeordet og gir det standardverdien ""
        const searchWord = searchInput.current?.value.trim() || "";

        // Validerer input
        if(searchWord === ""){
            updateStatusMessage("Skriv inn navnet du vil søke på", null);
            return; // Stopper ved ugyldig input
        }

        updateStatusMessage(`Søker etter ${searchWord}...`, null);

        const response = await searchAthleteByName(searchWord); 

        // Hånderer api-feil eller nulldata
        if(!response.success || response.data === null){
            updateStatusMessage("Feil under søking.. prøv på nytt", false);
            return; // Stopper ved api feil
        }

        const athletesFound = response.data as IAthlete[];

        // Håndterer suksess
        if(athletesFound.length > 0){
            updateStatusMessage(`Fant ${athletesFound.length} utøver(e) som inneholder ${searchWord}`, true);
        }else{
            updateStatusMessage(`Fant ingen spillere som inneholder ${searchWord}`, false);
        }
      }


      const handeShowAll = async () => {
        updateStatusMessage("Henter alle utøvere...", null)
        
        const response = await showAllAthletes();

        if(!response.success || response.data === null || !Array.isArray(response.data)){
            updateStatusMessage("Klarte ikke hente alle utøvere", false);
            return; // Funksjonen stopper her ved feil
        }

        const athletes = response.data;

        if(athletes.length > 0){
            // Success og data funnet
            updateStatusMessage(`Viser alle ${athletes.length} spillere`, null);
        }else{
            // Success, men listen er tom
            updateStatusMessage("Ingen spillere funnet i databasen", false);
        }
        // Tømmer søkefeltet
        if(searchInput.current){
            searchInput.current.value = "";
        }

    };

      return(
        <section className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">

            <header className="mb-4">
                <h3 className="text-2xl font-semibold"> Søke etter navn på spiller </h3>
            </header>
            

            {/* Inputfeltet for søk */}
            <div className="flex space-x-3">
                <label>Navn: </label>
                <input ref={searchInput} className="border border-black rounded-lg" type="text" />

                <button onClick={handleSearch} className="border border-black px-2 hover:bg-gray-400 " >
                     Søk </button>
                 {/* Vise alle knapper */}
                <button onClick={handeShowAll} className="border border-black px-2 hover:bg-gray-400" > vis alle </button>
            </div>
            
            <div >
                <p>Status:</p>
              <p className={isOk === true ? "text-green-600" : isOk === false ? "text-red-600" : ""} // grønn om true, rød om false og "vanlig" om null
              >{statusMessage}</p>

            </div>
            
        </section>
      )
}

export default AthleteForm;
