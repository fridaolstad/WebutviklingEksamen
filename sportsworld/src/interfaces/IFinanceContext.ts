import {type IFinance } from "./IFinance";
import type { IDefaultResponse } from "./ResponseInterfaces";

export interface IFinanceContext {
    finance: IFinance;

    loadFinance: () => Promise<void>;
    addMoney: (amount: number) => Promise<IDefaultResponse>;
    purchaseAthlete: (athleteId: number) => Promise<IDefaultResponse>;
    decrementPurchases: () => void;
}