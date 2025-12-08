// MoneyLeft, MoneySpent og NumberOfPurchases. Arver fra FinanceContext

import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import {type IFinanceContext} from "../../interfaces/IFinanceContext";

const FinanceSum = () => {
    const financeContext = useContext(FinanceContext) as IFinanceContext;
    const {finance} = financeContext;

    return (
        <section className="">
            <h3 className="" > Personlig finans-oversikt</h3>
            <p className="">Tilgjendelig beløp på konto:</p>
            <p className="">Totalt utgifter:</p>
            <p className="">Antall utøvere kjøpt:</p>
        </section>
    );
};

export default FinanceSum;
