// Layout med <FinancialSummary/>, <FinanceLoanForm/>, <PurchaseAthleteSection/>

import FinanceSum from "../components/finance/FinanceSum";
import FinanceLoan from "../components/finance/FinanceLoan";
import PurchaseAthlete from "../components/finance/FinancePurchase";
import FinanceBoughtAthletes from "../components/finance/FinanceBoughtAthletes";

const FinancePage = () => {
    return(
        <div className="p-6 max-w-7x1 mx-auto bg-blue-300">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Finansoversikt</h1>
            <div className="grid grid-cols-1 gap-10">
            <FinanceSum />
            <FinanceLoan />
            <PurchaseAthlete/>
            <FinanceBoughtAthletes />
            </div>
        </div>
    );
};

export default FinancePage;