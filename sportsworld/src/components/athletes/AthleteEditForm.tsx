import React, { useState } from "react";
import type{ IAthlete } from "../../interfaces/IAthlete";

 //evt skrive at denne ikke kan endres grunnet funksjoner i side 3
 // for å vise forståelse/eller begrunne hvorfor vi ikke lar brukeren endre kjøpsstatus

// lager properties som skal motta spiller og funksjonen forlagring og avbryt
// usikker på om jeg skal velge andre ord som onUpdate og onClosse/onCancel siden rolando har nevt at: 
// react stantard: onClick, onCancel = bruke handle i navnet. Hva tenker du Thea?
interface AthleteEditFormProperties {
    athlete: IAthlete;
    saveEdit: (data: IAthlete) => void;
    closeEdit: () => void;
}

const AthleteEditForm = ({athlete, saveEdit, closeEdit} : AthleteEditFormProperties ) =>{

    // føler eksempelet fra city eksempelet til rolando i slideserien: react-hooks-event - slide 12

    //sate: 
    const [formData, setFormData] = useState(athlete);
    const [statusMessage, setStatusMessage] = useState("");

    // håndterer endringer i input og select feltene
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{ 

        //name henter navnet i inputfeltet, value henter den nye verdien som brukeren har skrevet inn
        const {name, value} = e.target;
        let priceValue: any = value;

        // tømmer status ved ny endring
        setStatusMessage("");

        if(name === "price"){

            priceValue = Number(value);

            if(isNaN(priceValue) || value.trim() === ""){
                setStatusMessage("Pris må være et gyldig tall");
                return; // stopper prossessen
            }
        }

        // passer på at vi jobber med den siste tilstanden
        setFormData(prev => ({
            ...prev, [name]: priceValue
        }));
    };

    const handleSubmit = () => {
        // sopper lagring hvis en feilemldig dukker opp
        if(statusMessage){
            setStatusMessage("kan ikke lagre, du må skrive inn no inni feltet")
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


            {/*navn*/}
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
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border border-black rounded-lg"  
                />
            </div>

            {/*Kjønn - har kodet så brukeren kun kan veøge mellom opion vi lager, dette kan vi endre på om vi vil at brukeren skal 
            kunne skrive inn kjønn selv - men er nok enkelst å bruke select for å få lagret riktig data (tror jeg)*/}
            <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Kjønn: </label>
                <select
                // type="text"
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

            {/*bilde url*/}
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

            {/*knapper*/}
            <div className="mb-2 flex space-x-2">
                <button
                type="button"
                onClick={closeEdit}
                className="border border-black px-2 bg-red-200"
                > Avbryt
                </button>

                <button
                type="button"
                onClick={handleSubmit}
                className="border border-black px-2 bg-green-200"
                > Lagre registrering
                </button>
            </div>
        </section>
    )
}

export default AthleteEditForm;