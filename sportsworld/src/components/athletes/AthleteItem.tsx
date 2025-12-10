import type { IAthlete } from "../../interfaces/IAthlete";

const apiBaseUrl = "http://localhost:5236";

// lager props sånn at både athlete og finance kan bruke denne, setter ? da finance ikke MÅ bruke dem (skal ikke heller)
// prøve å bruke navnene delete og edit, men kan ikke bruke navnet delete da det allerede er noe i react
interface AthleteItemProperties {
    athlete : IAthlete;
    onEdit?: (athlete: IAthlete) => void;
    onDelete?: (id: number) => void;
}

const AthleteItem = ({ athlete, onEdit, onDelete } : AthleteItemProperties ) => {

    const imageUrl = `${apiBaseUrl}/images/${athlete.image}`;
    return (

        <div className="bg-gray-200 rounded-xl shadow-lg">

            <div className="h-48 w-full flex items-center justify-center overflow-hidden">
                <img 
                src={imageUrl}
                alt={`bilde av ${athlete.name}`}
                className="w-full h-full object-cover object-top rounded-t-xl"
                />

            </div>

            <div className="p-4 text-center">
            <h3 className="text-xl font-extrabold "> {athlete.name} ({athlete.id})</h3>
            </div>

            <div className="text-sm text-center">
            <p className="font-medium"> Kjønn: {athlete.gender}</p>
            <p className="font-medium"> Pris: {athlete.price} kr</p>
            <p> Status (kjøpt eller ikke): {athlete.purchaseStatus}</p>

            </div>

            {/* Knappene som vises hvis vi kaller på onEdit og onDelete, detet for at Finance også skal kunne bruke Item komponeneten 
             uten kanppene, da knappene bare trengst i Administrasjonssiden*/ }
            <div className="mt-4 pt-3 border-t border-gray-100 flex space-x-3 p-4">
                {onEdit && (
                    <button onClick={() => onEdit(athlete)}
                    className="flex-1 bg-blue-200 rounded-lg"
                    > Rediger spiller </button>
                )}

                {onDelete && (
                    <button onClick={() => onDelete(athlete.id)}
                    className=" flex-1 bg-red-300 rounded-lg"
                    > Slette spiller</button>
                )}

            </div>
            
            
        </div>
    )

}

export default AthleteItem;