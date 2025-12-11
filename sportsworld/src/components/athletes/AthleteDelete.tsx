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
        <section className="p-6 rounded-lg">
        <div>
            <header className="mb-4" >
                <h2 className="text-2xl font-semibold"> Bekreft sletting</h2>
                <p> Er du sikker på at du vil slette spilleren: {athlete.name} (id: {athlete.id}) ? </p>
            {/* om vi vil ha egen styling på navn og id til spilleren kan det legges inn i egen p tagg */}
            </header>

            

            <div className="flex space-x-3"> 
                <button
                onClick={onCancel}
                className="border border-black px-2 bg-green-200"
                > 
                Avbryt 
                </button>

                <button
                onClick={onConfirm}
                className="border border-black px-2 bg-red-300"
                >
                Ja, slett spiller    
                </button>
            </div>
        </div>
        </section>
    );

};

export default AthleteDelete;