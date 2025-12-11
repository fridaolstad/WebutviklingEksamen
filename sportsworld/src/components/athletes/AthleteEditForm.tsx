import React, { useState } from "react";
import type{ IAthlete } from "../../interfaces/IAthlete";

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

    // håndterer endringer i input og select feltene
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{ // hvis det krasjsr legg til | HTMLSelectElement>

        //name henter navnet i inputfeltet, value henter den nye verdien som brukeren har skrevet inn
        const {name, value} = e.target;
        let newValue: any = value;

        // selv om purchaseStatus er en boolean i interfacet, returnerer string true eller false i input, derfor kodr vi sånn at
        // stringer true blir til boolean true  

        // NB! VIKTIG - jeg tenker vi kanskje kan fjerne denne ifen? da jeg er redd for at hvis brukeren kan endre på 
        // statusen til spillerne i side 1 kan klusse med funksjoner om å vise kjøpt spille på side 3?, hva tenker du Thea?
        // []ja vi sletter den []nei vi lar den bli (sett kryss for ja eller nei :)) heh
        //om ja minn meg på at vi må slette det nede i html også, evt skrive at denne ikke kan endres grunnet funksjoner i side 3
        // for å vise forståelse/eller begrunne hvorfor vi ikke lar brukeren endre kjøpsstatus
        if(name === "purchaseStatus"){
            newValue = value === "true";
        }

        // passer på at vi jobber med den siste tilstanden
        setFormData(prev => ({
            ...prev, [name]: newValue
        }));
    };

    const handleSubmit = () => {
        saveEdit(formData); 
    };

    return(
        <section>
            <h3> Endre en spiller </h3>
            <div> Id på spilleren som blir endret: {formData.id}</div>

            {/*navne*/}
            <div>
                <label> Navn: </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                // her kommer styling
                />
            </div>

            {/*Pris*/}
            <div>
                <label> Pris: </label>
                <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                // her kommer tailwind styling 
                />
            </div>

            {/*Kjønn - har kodet så brukeren kun kan veøge mellom opion vi lager, dette kan vi endre på om vi vil at brukeren skal 
            kunne skrive inn kjønn selv - men er nok enkelst å bruke select for å få lagret riktig data (tror jeg)*/}
            <div>
                <label> Kjønn: </label>
                <select
                // type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                // husk styling her
                >
                

                <option value={"Mann"}> Mann </option>
                <option value={"Kvinne"}> Kvinne </option>
                <option value={"Annet"}> Annet </option>
                </select>
            </div>


            {/*kjøpe status - denne som evt må slettes, forklaring lenger opp :))*/}
            <div>
                <label> Kjøpestatus: </label>
                <select
                name="purchaseStatus"
                value={formData.purchaseStatus ? "true" : "false"}
                onChange={handleChange}
                // husk styling her
                >
               

                <option value={"True"}> Kjøpt</option>
                <option value={"False"}> Ikke kjøpt </option>
                </select>
            </div>

            {/*bilde url*/}
            <div>
                <label> bilde url: </label>
                <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                // husk styling her
                />
            </div>

            {/*knapper*/}
            <div>
                <button
                type="button"
                onClick={closeEdit}
                // HUSK å legge til tailwind styling her, className: "blablabla"
                > Avbryt
                </button>

                <button
                type="button"
                onClick={handleSubmit}
                // HUSK å legge til tailwind styling her, className: "blablabla"
                > Lagre endringer
                </button>
            </div>
        </section>
    )
}

export default AthleteEditForm;