// Wrapper for Athlete-list. Ledig utøver. Henter fra context/service.

import { useContext, useState} from "react";
import { AthleteContext } from "../../context/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { FinanceContext } from "../../context/FinanceContext";
import type { IFinanceContext} from "../../interfaces/IFinanceContext"

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

        const response = await purchaseAthlete(athleteId);
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
        setTimeout(() => {
            setStatusMessage("");
            setIsOk(null);
        }, 4000);
    };


    // Viser kun tilgjengelige utøvere

    const availableAthletes = athletes.filter(a => !a.purchaseStatus);

    return (
        <section>
            <h3>Kjøp utøver</h3>
            {availableAthletes.length === 0 ?(
                <p>Ingen utøvere tilgjengelige for å kjøope</p>
            ): (
                <ul>
                    {availableAthletes.map(a => (
                        <li>
                            <span>{a.name} - {a.price}kr</span>
                            <button
                            onClick={() => handlePurchase(a.id, a.price)}
                            className=""
                            >Kjøp</button>
                        </li>
                    ))}
                </ul>
            )}
            {statusMessage && (
                <p className="">{isOk === true} Status: {statusMessage}</p>

            )}
        </section>
    );
};

 export default PurchaseAthlete;