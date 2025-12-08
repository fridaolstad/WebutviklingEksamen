// Layout med <FinancialSummary/>, <FinanceLoanForm/>, <PurchaseAthleteSection/>

import FinanceSum from "../components/finance/FinanceSum";
import FinanceLoan from "../components/finance/FinanceLoan";

const FinancePage = () => {
    return(
        <div>
            <h1>Finans oversikt</h1>
            <FinanceSum />
            <FinanceLoan />
        </div>
    );
};

export default FinancePage;