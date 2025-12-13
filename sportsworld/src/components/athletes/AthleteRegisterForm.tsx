import { useState, useContext } from "react";
import { AthleteContext } from "../../context/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";


// mal for formen, den starter tom og kan kalles på for å tømme formen
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
    const [statusMessage, setStatusMessage] = useState<string>("...venter på handling");
    const [isOk, setIsOk] = useState<boolean | null>(null);
    const [imageFile, setImageFile] = useState <File | null>(null);

    const clearStatusMessage = (message: string, ok: boolean) =>{
            setStatusMessage(message);
            setIsOk(ok); // setter farge på statusmelding
            setTimeout(() => {
                setStatusMessage(""); // tømmer stausmelding
                setIsOk(null); 
            }, 
            9000) // Etter 9000 millisekunder (9 sekunder) skal meldingen nullstilles
        };

    // prøvd å buke e som vist i forelesningen, men vscode sier vi må bruke e:any
    const handleRegister = (e: any) => {
        const {name, value} = e.target;

        let noeValue = value;

        if(name === "price"){
            noeValue = Number(value);

            if(isNaN(noeValue)){
                setStatusMessage("Pris må være et gyldig tall")
                return;
            }
        }
        

        setUserData(prev =>({
            ...prev,
            [name]: noeValue
        }));

        setStatusMessage("");
        }

        const handleFileChange = (e: any) => {
            const files = e.target.files;

             // Sjekker at files (hvor bildet skal ligge) inni input type file ikke er tomt
            if(files != null){
                setImageFile(files[0]); //får tak i første
                console.log(files[0]);

                // kan du chat forklare koden ned til else alstå hele setuserdata og det inni elsen for foreleser hatr ikke det med
                setUserData(prev => ({
                    ...prev,
                    image: files[0].name
                }));
            } else{
                setImageFile(null);
                setUserData(prev => ({...prev, image: ""}))
            }
            setStatusMessage("");
        }

        const handleCancel = () => {
            setUserData(emptyAthlete);
            setImageFile(null);
            clearStatusMessage("Registering ble avsluttet, tømmer input", false)
        }


        const handleSubmit = async (e: any) =>{
            e.preventDefault(); // for å ikke laste inn siden på nytt

            // sjekker at navn, bilde og gender blir fylt inn inn
            if(userData.name.trim()=== "" || userData.price <= 0 || !imageFile){
                clearStatusMessage("Du må fylle ut en navn, en pris større en 0, og velge et bilde", false)
                return;
            }

            clearStatusMessage("Lager ny spiller og lastet opp bilde", true);

            const AthleteToSave: IAthlete ={
                id: 0,
                name: userData.name,
                gender: userData.gender,
                price: userData.price,
                image: userData.image,
                purchaseStatus: false
            }; 

            try{
                const response = await registerAthlete(AthleteToSave, imageFile);

                if(response.success){
                    clearStatusMessage(`${userData.name} ble registeret som en potensiell spiller!`, true)
                    setUserData(emptyAthlete); // tømmer tekstfeltene
                    setImageFile(null); // tømmer bilde staten
                }else{
                    clearStatusMessage("Noe gikk galt ved lagring av spiller", false)
                }

            }catch(error){
                clearStatusMessage("Feil ved tilkobling til server", false);
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
                type="text" // settter denne til test fordi......
                name="price"
                value={userData.price} // sette sen som thea sin 
                onChange={handleRegister}
                className="border border-black rounded-lg"
                />
                </div>

                {/*Kjønn - har kodet så brukeren kun kan veøge mellom opion vi lager, dette kan vi endre på om vi vil at brukeren skal 
                 kunne skrive inn kjønn selv - men er nok enkelst å bruke select for å få lagret riktig data (tror jeg)*/}
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
                <p className={
                    isOk ? "text-green-600" : "text-red-600" // isok === true da blir teksten grønn, om isOk === false tekst blir rød
                }>
                    Status: {statusMessage}</p>
             </div>
            </section>
     )
}

export default AthleteRegisterForm;