import { type IAthlete } from "./IAthlete";

export interface IDefaultResponse{
    success: boolean;
    message?: string;
}

export interface IResponseData {
    success: boolean
    data?: null
}

export interface IAthleteResponse{
    success: boolean
    data?: IAthlete | null
}

export interface IAthletesResponse {
    success: boolean
    data?: IAthlete[] | null
}
