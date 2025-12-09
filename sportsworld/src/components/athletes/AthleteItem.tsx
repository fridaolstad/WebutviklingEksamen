import type { IAthlete } from "../../interfaces/IAthlete";

// lager props sånn at både athlete og finance kan bruke denne, setter ? da finance ikke MÅ bruke dem (skal ikke heller)
// prøve å bruke navnene delete og edit, men kan ikke bruke navnet delete da det allerede er noe i react
interface AthleteItemProps {
    athlete : IAthlete;
    onEdit?: (athlete: IAthlete) => void;
    onDelete?: (id: number) => void;
}

const AthleteItem = ({ athlete, onEdit, onDelete } : AthleteItemProps ) => {
    return (
        <article>
            <div>
            <h3> {athlete.name}, ({athlete.id})</h3>
            <p> {athlete.gender}</p>
            <p> Pris: {athlete.price}</p>
            <p> Status (kjøpt eller ikke): {athlete.purchaseStatus}</p>

            <p> {athlete.image}</p>
            </div>

            {/* Knappene som vises hvis vi kaller på onEdit og onDelete, detet for at Finance også skal kunne bruke Item komponeneten 
             uten kanppene, da knappene bare trengst i Administrasjonssiden*/ }
            <div>
                {onEdit && (
                    <button onClick={() => onEdit(athlete)}> rediger eksisterende utøver</button>
                )}

                {onDelete && (
                    <button onClick={() => onDelete(athlete.id)}> slette utøver</button>
                )}

            </div>
            
            
        </article>
    )

}

export default AthleteItem;