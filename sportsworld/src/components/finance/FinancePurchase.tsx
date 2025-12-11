// Wrapper for Athlete-list. Ledig utøver. Henter fra context/service.

import { useContext, useState} from "react";
import { AthleteContext } from "../../context/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { FinanceContext } from "../../context/FinanceContext";
import type { IFinanceContext} from "../../interfaces/IFinanceContext"
import AthleteItem from "../athletes/AthleteItem";

const PurchaseAthlete = () => {
    const athleteContext = useContext(AthleteContext) as IAthleteContext;
    const financeContext = useContext(FinanceContext) as IFinanceContext;

    const {athletes, updateAthlete} = athleteContext;
    const {finance, purchaseAthlete} = financeContext;

    const [statusMessage, setStatusMessage] = useState<string>("");
    const [isOk, setIsOk] = useState <boolean | null >(null);

    const handlePurchase = async (athleteId: number, price: number) => {
        if (price > finance.moneyLeft) {
            updateStatusMessage ("Dessverre ikke nok penger på konto..", false);
            return;
        }

        const response = await purchaseAthlete(price);
        if(response.success) {
            // oppdatering av utøver sin purchaseStatus hvis true
            const athleteUpdate = athletes.find (a => a.id === athleteId);
            
            if(athleteUpdate) {
                athleteUpdate.purchaseStatus = true;
                updateAthlete(athleteUpdate);
            }
            updateStatusMessage ("Kjøp vellykket!", true);
        } else {
            updateStatusMessage(response.message || "Kjøp feilet", false);
        
        }
    };

    const updateStatusMessage = (message: string, ok: boolean) => {
        setStatusMessage(message);
        setIsOk(ok);
        setTimeout(() => { //må ikke ha med, men kan
            setStatusMessage("");
            setIsOk(null);
        }, 4000);
    };


    // Viser kun tilgjengelige utøvere
    const availableAthletes = athletes.filter(a => !a.purchaseStatus);

    return (
        <section className="p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Kjøp utøver</h3>

            {availableAthletes.length === 0 ?(
                <p className="text-gray-600">Ingen utøvere tilgjengelige for å kjøope</p>
            ): (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableAthletes.map(a => (
                        <div key={a.id} className="flex flex-col items-center">
                            <AthleteItem athlete={a} />
                            <button
                            onClick={() => handlePurchase(a.id, a.price)}
                            className="bg-green-600 hover:bg-green-700 text-black px-4 py-1.5 rounded-md w-full"
                            >Kjøp</button>
                        </div>
                    ))}
                </div>
            )}
            {statusMessage && (
                <p className={isOk ? "text-green-600" : "text-red-600"}>Status: {statusMessage}</p>

            )}
        </section>
    );
};

 export default PurchaseAthlete;