import type { IAthlete } from "../../interfaces/IAthlete";

// lager denne sånn at ikke brukeren skal kunne slette en spiller ved et uhell, brukeren skal få en beskjed om at hen er på vei til 
// å slette en spiller og må deretter svare ja eller nei

interface DeleteProperties {
    athlete: IAthlete;
    onConfirm: () => void;
    onCancel: () => void;
}

const AthleteDelete = ({athlete, onConfirm, onCancel}: DeleteProperties) =>{
    // husk å legge til tailwind styling !!
    return(
        <div>
            <h2>Bekreft sletting</h2>

            <p> Er du sikker på at du vil slette spilleren: {athlete.name} (id: {athlete.id}) ? </p>
            {/* om vi vil ha egen styling på navn og id til spilleren kan det legges inn i egen p tagg */}

            <div> 
                <button
                onClick={onCancel}
                // /* evt stylling av knapp her
                > 
                Avbryt 
                </button>

                <button
                onClick={onConfirm}
                // /* evt stylling av knapp her
                >
                Ja, slett spiller    
                </button>
            </div>
        </div>
    );

};

export default AthleteDelete;