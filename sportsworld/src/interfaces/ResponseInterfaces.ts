import { type IAthlete } from "./IAthlete";

// lager en egen fil for response (mener rolando sa at dette var best praksis, enn å ha det i context)

export interface IDefaultResponse{
    success: boolean
    data?: IAthlete | null
}

export interface IAthletesResponse {
    success: boolean
    data?: IAthlete[] | null
}