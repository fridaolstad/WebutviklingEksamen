import React, { useState } from "react";
import type{ IAthlete } from "../../interfaces/IAthlete";

// Lager properties som skal motta spiller og funksjonen forlagring og avbryt
interface AthleteEditFormProperties {
    athlete: IAthlete;
    saveEdit: (data: IAthlete) => void;
    closeEdit: () => void;
}

const AthleteEditForm = ({athlete, saveEdit, closeEdit} : AthleteEditFormProperties ) =>{

    const [formData, setFormData] = useState(athlete);
    const [statusMessage, setStatusMessage] = useState("");
  

    // Håndterer endringer i input og select feltene
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{ 

        //Name henter navnet i inputfeltet, value henter den nye verdien som brukeren har skrevet inn
        const {name, value} = e.target;
        let priceValue: any = value;

        // Tømmer status ved ny endring
        setStatusMessage("");

        if(name === "price"){

            priceValue = Number(value);

            if(isNaN(priceValue) || value.trim() === ""){
                setStatusMessage("Pris må være et gyldig tall");
                return; // Stopper prossessen
            }
        }

        // Passer på at vi jobber med den siste tilstanden
        setFormData(prev => ({
            ...prev, [name]: priceValue
        }));
    };

    const handleSubmit = () => {

        // Sopper lagring hvis en feilmelding dukker opp
        if(statusMessage){
            setStatusMessage("Kan ikke lagre, du må skrive inn no inni feltet")
            return;
        }
        saveEdit(formData);
    };

    return(
        <section className="p-6 rounded-lg">

            <header className="mb-4">
                <h3 className="text-2xl font-semibold"> Endre en spiller </h3>
                <div> Id på spilleren som blir endret: {formData.id}</div>
            </header>


            {/*Navn*/}
            <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Navn: </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-black rounded-lg" 
                />
            </div>

            {/*Pris*/}
            <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Pris: </label>
                <input
                type="text" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border border-black rounded-lg"  
                />
            </div>

            {/*Kjønn - har kodet så brukeren kun kan velg mellom opion vi lager*/}
            <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Kjønn: </label>
                <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-black rounded-lg" 
                >
                
                <option value={"Mann"}> Mann </option>
                <option value={"Kvinne"}> Kvinne </option>
                <option value={"Annet"}> Annet </option>
                </select>
            </div>

            {/*Bilde url*/}
            <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Bilde url: </label>
                <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="border border-black rounded-lg" 
                />
            </div>

            {/*Knapper*/}
            <div className="mb-2 flex space-x-2">
                <button
                type="button"
                onClick={closeEdit}
                className="border border-black px-2 bg-red-600 hover:bg-red-700"
                > Avbryt
                </button>

                <button
                type="button"
                onClick={handleSubmit}
                className="border border-black px-2 bg-green-600 hover:bg-green-700"
                > Lagre registrering
                </button>
            </div>
        </section>
    )
}

export default AthleteEditForm;