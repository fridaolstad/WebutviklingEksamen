import { useState, useContext } from "react";
import { AthleteContext } from "../../context/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import { useClearStatusMessage } from "../hooks/UseClearStatusMessage";


// Mal for formen, den starter tom og kan kalles på for å tømme formen
const emptyAthlete : IAthlete = {
    id : 0,
    name: "",
    gender: "",
    price: 0,
    image: "",
    purchaseStatus: false
}; 

const AthleteRegisterForm = () => {

    // states: 
    const {registerAthlete} = useContext(AthleteContext) as IAthleteContext;
    const [userData, setUserData] = useState(emptyAthlete);
    const {statusMessage, isOk, updateStatusMessage, setStatusMessage} = useClearStatusMessage("Venter på handling...");
    const [imageFile, setImageFile] = useState <File | null>(null);


    // Håndterer all input unntatt fil
    const handleRegister = (e: any) => { // prøvd å buke e som vist i forelesningen, men vscode sier vi må bruke e:any
        const {name, value} = e.target;

        let newValue = value;

        // validering av pris 
        if(name === "price"){
            newValue = Number(value);

            if(isNaN(newValue)){
                updateStatusMessage("Pris må være et gyldig tall", false)
                return;
            }
        }
        
        // bruker (...prev) for å beholde alle de forrige feltene (id, gender osv.), hvis brukeren feks bare oppdaterer navnet
        // oppdateres kun navn-feltet [name] med den nye verdien newValue
        setUserData(prev =>({
            ...prev,
            [name]: newValue
        }));

        setStatusMessage("");
        };

        // Håndtere filendring
        const handleFileChange = (e: any) => {
            const files = e.target.files;

             // Sjekker at files (hvor bildet skal ligge) inni input type file ikke er tomt
            if(files != null){
                setImageFile(files[0]); // lagrer bildet i en separat state
                console.log(files[0]);

                // Oppdaterer userData med filnavnet
                setUserData(prev => ({
                    ...prev,
                    image: files[0].name
                }));
            } else{
                // hvis brukeren avbryter eller sletter filen
                setImageFile(null);
                setUserData(prev => ({...prev, image: ""}))
            }
            setStatusMessage("");
        }

        const handleCancel = () => {
            setUserData(emptyAthlete);
            setImageFile(null);
            updateStatusMessage("Registering ble avsluttet, tømmer input", false)
        }


        const handleSubmit = async (e: any) =>{
            e.preventDefault(); // for å ikke laste inn siden på nytt

            // sjekker at alle felt er fylt inn
            if(userData.name.trim()=== "" || userData.price <= 0 || !imageFile){
                updateStatusMessage("Du må fylle ut en navn, en pris større en 0, og velge et bilde", false)
                return;
            }

            updateStatusMessage("Lager ny spiller og lastet opp bilde", true);

            try{
                const response = await registerAthlete(userData, imageFile);

                if(response.success){
                    setStatusMessage(`${userData.name} ble registeret, bla ned for å se den potensielle nye spilleren`)
                    setUserData(emptyAthlete); // tømmer tekstfeltene
                    setImageFile(null); // tømmer bilde staten
                }else{
                    updateStatusMessage("Noe gikk galt ved lagring av spiller", false)
                }

            }catch(error){
                updateStatusMessage("Feil ved tilkobling til server", false);
                console.error(error);

            }
        };

        return(
            <section className="p-6 bg-gray-100 rounded-lg shadow-md">
                <header>
                    <h3 className="text-2xl font-semibold mb-4"> Registrer potensiell ny spiller</h3>
                </header>

                {/*navn*/}
                <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Navn: </label>
                <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleRegister}
                className="border border-black rounded-lg"
                />
                </div>

                {/*Pris*/}
                <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Pris: </label>
                <input
                type="text" 
                name="price"
                value={userData.price} // sette sen som thea sin 
                onChange={handleRegister}
                className="border border-black rounded-lg"
                />
                </div>

                {/*Kjønn - Vi bruker select sånn at brukeren kun kan velge mellom opions vi lager*/}
               <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Kjønn: </label>
                <select
                name="gender"
                value={userData.gender}
                onChange={handleRegister}
                className="border border-black rounded-lg" 
                >
                <option value={"Mann"}> Mann </option>
                <option value={"Kvinne"}> Kvinne </option>
                <option value={"Annet"}> Annet </option>
                </select>
                </div>

              {/*bilde*/}
             <div className="mb-2 flex space-x-2">
                <label className="font-semibold"> Bilde(fil): </label>
                <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="border border-black rounded-lg" 
                />
             </div>

             {/* kjøpestatus*/}
             <div className="mb-2 flex space-x-2">
                <p className="font-semibold"> Kjøpestatus: Ikke kjøpt</p>
             </div>

             {/* Knapper */}

             <div className="mb-2 flex space-x-2">
                <button
                type="button"
                className="border border-black px-2 bg-red-500 hover:bg-red-700"
                onClick={handleCancel}
                > Avbryt
                </button>

                <button
                type="button"
                onClick={handleSubmit}
                className="border border-black px-2 bg-green-500 hover:bg-green-700"
                > Lagre endringer
                </button>
             </div>

             <div>
                <p>Status: </p>
                <p className={
                    isOk === true ? "text-green-600" : isOk === false ? "text-red-600" : "" // grønn om true, rød om false og "vanlig" om null
                }>
                    {statusMessage}</p>
             </div>
            </section>
     )
}

export default AthleteRegisterForm;