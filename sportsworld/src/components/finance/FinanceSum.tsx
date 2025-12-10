// MoneyLeft, MoneySpent og NumberOfPurchases. Arver fra FinanceContext

import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import {type IFinanceContext} from "../../interfaces/IFinanceContext";

const FinanceSum = () => {
    const financeContext = useContext(FinanceContext) as IFinanceContext;
    const {finance} = financeContext;

    return (
        <section className="">
            <h3 className="" >Personlig finans-oversikt</h3>
            <p className="">Tilgjendelig beløp på konto: {finance.moneyLeft}kr</p>
            <p className="">Totalt utgifter: {finance.moneySpent}kr</p>
            <p className="">Antall utøvere kjøpt: {finance.numberOfPurchases}</p>
        </section>
    );
};

export default FinanceSum;
