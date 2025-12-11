// Input beløp + knapp for lån. Kaller på financeContext.addMoney()

import React, { useState, useContext } from "react";
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
            updateStatusMessage(`Beløpet må være større enn 0kr`, false);
            return;
        }

        const response = await addMoney(loanAmount);
        if(response.success) {
            updateStatusMessage(`Lånet på ${loanAmount}kr er lagt til`, true);
            setLoanAmount(0);
        } else {
            updateStatusMessage(response.message || `Lånet feilet`, false);
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
        <section className="p-5 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Lånekasse</h3>
                <div className="">
                    <label>Beløp: </label>
                    <input className="border rounded-lg"
                    type="text"
                    value={loanAmount === 0? "" : loanAmount}
                    onChange={(e)=> setLoanAmount(Number(e.target.value))}/>
                </div>
                <button onClick={handleLoan} className="border rounded-lg " >
                    Lån penger
                </button>
                {
                    <p className={isOk ? "text-green-600" : "text-red-600"}>{statusMessage}</p> 
                }
        </section>
    );
};

export default FinanceLoan;