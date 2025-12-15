// finance (IFinance), getFinance(), addMoney(amount), purchaseAthlete(id, price)

import { useState, createContext, type ReactNode, useEffect } from "react";
import { type IFinance } from "../interfaces/IFinance";
import { type IFinanceContext} from "../interfaces/IFinanceContext"
import FinanceService from "../services/FinanceService"
import { type IDefaultResponse, type IResponseData } from "../interfaces/ResponseInterfaces";


export const FinanceContext = createContext<IFinanceContext | null>(null);


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
        loadFinance();
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
                    message: `Du har fått inn ${amount} på konto`
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

    const loadFinance = async () => {
        try{
            const response: IResponseData<IFinance> = await FinanceService.getFinance();
            if (response.success && response.data){
                setFinance(response.data);
            } else {
                console.error("FinanceService.getFinance ble falsk");
            }
            } catch (error){
                console.error("Det er error i loadFinance", error);
            }
    };

    // Reduserer telleren 
    const decrementPurchases = () => {
        setFinance(prevFinance => {

            let newNumberOfPurchases = prevFinance.numberOfPurchases;

            // sånn at telleren ikke går i minus
            if(newNumberOfPurchases > 0){
                newNumberOfPurchases = newNumberOfPurchases -1;
            }else {
                newNumberOfPurchases = 0;
            }

            return {
                ...prevFinance,
                numberOfPurchases: newNumberOfPurchases
            }; 
        });
    };

    return (
        <FinanceContext.Provider value={{
            finance, 
            addMoney, 
            purchaseAthlete,
            loadFinance,
            decrementPurchases
        }}>
            {children}
        </FinanceContext.Provider>
    );
};