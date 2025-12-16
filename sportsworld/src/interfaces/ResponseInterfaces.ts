import { type IAthlete } from "./IAthlete";

// lager en egen fil for response (mener rolando sa at dette var best praksis, enn å ha det i context)

// Endret til generic response, så kan vi bruke samme interface for alle type data.
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
