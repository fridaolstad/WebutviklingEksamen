// Input beløp + knapp for lån. Kaller på financeContext.addMoney()

import { useState, useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import type { IFinanceContext } from "../../interfaces/IFinanceContext";

const FinanceLoan = () => {
    const financeContext = useContext(FinanceContext) as IFinanceContext;
    const {addMoney} = financeContext;

    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [isOk, setIsOk] = useState<boolean | null>(null);

    const handleLoan = async () => {
        if(loanAmount <=0) {
            updateStatusMessage("Beløpet må være større enn 0kr", false);
            return;
        }

        const response = await addMoney(loanAmount);
        if(response.success) {
            updateStatusMessage('Lånet på ${loanAmount}kr er lagt til', true);
            setLoanAmount(0);
        } else {
            updateStatusMessage(response.message || "Lånet feilet", false);
        }
    };

    const updateStatusMessage = (message: string, ok: boolean) => {
        setStatusMessage(message);
        setIsOk(ok);
        setTimeout(() =>{
            setStatusMessage("");
            setIsOk(null);
        }, 4000);
    };

    return (
        <section>
            <h3>Lånekasse</h3>
                <div>
                    <label>Beløp:</label>
                    <input 
                    type="number"
                    value={loanAmount}
                    onChange={(e)=> setLoanAmount(Number(e.target.value))}/>
                </div>
                <button onClick={handleLoan}>
                    Lån penger
                </button>
                {statusMessage &&(
                    <p className="{isOk?}"></p>
                )}
        </section>
    );
};

export default FinanceLoan;