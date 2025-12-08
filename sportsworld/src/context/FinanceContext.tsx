// finance (IFinance), getFinance(), addMoney(amount), purchaseAthlete(id, price)

import { useState, createContext, type ReactNode, useEffect } from "react";
import { type IFinance } from "../interfaces/IFinance";
import { type IFinanceContext} from "../interfaces/IFinanceContext"
import FinanceService from "../services/FinanceService"
import { type IDefaultResponse, type IResponseData } from "../interfaces/ResponseInterfaces";


export const FinanceContext = createContext<IFinanceContex | null>(null);

interface Props { children: ReactNode};

export const FinanceProvider = ({children}: Props) => {

    // 1 rad i databasen
    const [finance, setFinance] = useState<IFinance>({
        id: 0,
        moneyLeft: 0,
        moneySpent: 0,
        numberOfPurchases: 0
    });

    // Henter økonomidata før alt annet kjører.
    useEffect(() => {
        loanFinanceFromService();
    },[]);


    const loanFinanceFromService = async () => {
        try {
        const response: IResponseData<IFinance> = await FinanceService.getFinance();

        if (response.success && response.data){
            setFinance(response.data);
        } else {
            console.error("FinanceService.getFinance booleanen ble falsk..")
        }
        }catch (error){
        console.error("Det er en error i loadFinanceFromService", error);
        }
    };

    // Låne penger

    const addMoney = async (amount: number): Promise<IDefaultResponse> => {
        try {
            const response: IResponseData<IFinance> = await FinanceService.addMoney(amount);

            if (response.success && response.data){
                setFinance(response.data);
                return {
                    success: true,
                    message: "Du har fått inn ${amount} på konto"
                };
            }
            return {
                success: false,
                message: "Lånet failet.."
            };
        } catch (error){
            console.error("Error i addMoney:", error);
            return {
                success: false,
                message: "Error ved søk om lån"
            };
        }
    };

    // Kjøpe utøver, backend oppdateres

    const purchaseAthlete = async(athleteID: number): Promise<IDefaultResponse> => {
        try{
            const response: IResponseData<IFinance> = await FinanceService.purchaseAthlete(athleteID);

            if (response.success && response.data) {
                setFinance(response.data);
                return {
                    success: true,
                    message: "Vellykket kjøp av utøver, gratulerer!"
                };
            }
            return {
                success: false,
                message: "Kjøpet ble ikke godkjent.."
            };
        } catch (error){
            console.error("Error i purchaseAthlete:", error);
            return {
                success: false,
                message: "Kunne ikke utføre kjøp av utøver.."
            }
        }
    };

    return (
        <FinanceContext.Provider value={{
            finance,
            loanFinanceFromService, 
            addMoney, 
            purchaseAthlete
        }}>
            {children}
        </FinanceContext.Provider>
    );
};