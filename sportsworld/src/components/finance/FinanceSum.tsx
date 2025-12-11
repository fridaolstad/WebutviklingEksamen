// MoneyLeft, MoneySpent og NumberOfPurchases. Arver fra FinanceContext

import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import {type IFinanceContext} from "../../interfaces/IFinanceContext";

const FinanceSum = () => {
    const financeContext = useContext(FinanceContext) as IFinanceContext;
    const {finance} = financeContext;

    return (
        <section className="p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-800" >Finans-oversikt</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg text-center border">
                    <h2 className="text-gray-600 text-sm">Tilgjendelig beløp på konto:</h2>
                    <p className="text-2xl font-bold">{finance.moneyLeft}kr</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-center border">
                    <h2 className="text-gray-600 text-sm">Totalt utgifter:</h2>
                    <p className="text-2xl font-bold">{finance.moneySpent} kr</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-center border">
                    <h2 className="text-gray-600 text-sm">Antall utøvere kjøpt: </h2>
                    <p className="text-2xl font-bold">{finance.numberOfPurchases}</p>
                </div>

            </div>
        </section>
    );
};

export default FinanceSum;

