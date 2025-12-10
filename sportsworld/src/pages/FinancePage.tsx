// Layout med <FinancialSummary/>, <FinanceLoanForm/>, <PurchaseAthleteSection/>

import FinanceSum from "../components/finance/FinanceSum";
import FinanceLoan from "../components/finance/FinanceLoan";
import PurchaseAthlete from "../components/finance/FinancePurchase";

const FinancePage = () => {
    return(
        <div>
            <h1>Finans oversikt</h1>
            <FinanceSum />
            <FinanceLoan />
            <PurchaseAthlete/>
        </div>
    );
};

export default FinancePage;