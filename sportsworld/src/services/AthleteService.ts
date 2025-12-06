import axios from "axios";
import { type IAthlete } from "../interfaces/IAthlete";
import type { IDefaultResponse, IAthletesResponse } from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5009/api/athlete"; // endre til riktig url

// denne servicen skal jobbe mot backend 

const getAllAthletes = async (): Promise<IAthletesResponse> => {
    try{
        const response = await axios.get(endpoint); // gjør get-kall til backend 
        return {
            success: true, 
            data: response.data
        };

    }catch{
        return {
            success: false,
            data: null

        }

    }
}

const getAthleteById = async (id: number): Promise<IAthletesResponse> => {
    try{
        const result = await axios.get(`${endpoint}/${id}`);
        return {
            success: true,
            data: result.data
        };

    }catch{
        return {
            success: false,
            data: null
        }

    }
}





const postAthlete = async (athlete: IAthlete) : Promise<IDefaultResponse> => {
    try{
        const response = await axios.post(endpoint, athlete); // poster athlete til backend
        console.log(response);
        return{
            success: true,
            data: response.data
        }

    }catch{
        return{
            success: false
        }

    }
}





export default {getAllAthletes, getAthleteById, postAthlete}


