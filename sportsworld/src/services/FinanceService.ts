import axios from "axios";
import {type IFinance } from "../interfaces/IFinance";
import { type IResponseData } from "../interfaces/ResponseInterfaces";
import PurchaseAthlete from "../components/finance/FinancePurchase";


const financeEndpoint = "http://localhost:5236/api/finance" 


const FinanceService = {
    // GET /finance
    getFinance: async(): Promise<IResponseData<IFinance>> => {
        try {
            const response = await axios.get (financeEndpoint);

            return{
                success: true,
                data: response.data
            };
        } catch (error){
            console.error ("FinanceService.getFinance error:", error);
        
            return{
                success: false,
                data: null
            };
        }
    },

    // POST /finance/addmoney
    addMoney: async (amount: number): Promise<IResponseData<IFinance>> => {
        try {
            const response = await axios.post(`${financeEndpoint}/addmoney`, {amount});

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error ("FinanceService.addMoney error:", error);

            return {
                success: false,
                data: null
            };
        }
    },

    //PUt /finance/purchase
    purchaseAthlete: async (price: number): Promise<IResponseData<IFinance>> => {
        try {
            const response = await axios.post(`${financeEndpoint}/purchase/`,{price});

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error("FinanceService.purchaseAthelete error", error);

            return {
                success: false, 
                data: null
            };
        }
    }
};

export default FinanceService;






