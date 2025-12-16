import axios from "axios";
import { type IAthlete } from "../interfaces/IAthlete";
import type { IAthleteResponse, IAthletesResponse } from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5236/api/athlete";
const endpointImage = "http://localhost:5236/api/ImageUpload";

// denne servicen skal jobbe mot backend

const getAllAthletes = async (): Promise<IAthletesResponse> => {
    try{
        const response = await axios.get(endpoint); // gjør get-kall til backend 
        return {
            success: true, 
            data: response.data
        };

    }catch (error){
        console.error("feil med henting av athletes", error)
        return {
            success: false,
            data: null

        }

    }
}

const getAthleteById = async (id: number): Promise<IAthleteResponse> => {
    try{
        const result = await axios.get(`${endpoint}/${id}`); // get-kall til backend
        return {
            success: true,
            data: result.data
        };

    }catch (error){
        console.error("feil ved henting av athlete etter id", error)
        return {
            success: false,
            data: null
        }

    }
}

const getAthleteByName = async (name: string): Promise<IAthletesResponse> => {
    try{
        const result = await axios.get(`${endpoint}/GetByName/${name}`); // get-kall til backend
        return{
            success: true,
            data: result.data
        };

    }catch(error){
        console.error("feil ved henting av athlete etter navn", error)
        return{
            success: false,
            data: null
        }
    }
}

//oppdaterer eksisterende athlete (side 1)
const updateAthlete = async (editedAthlete : IAthlete) : Promise<IAthleteResponse> => {
    try{
        const result = await axios.put(endpoint, editedAthlete); // poster endret athlete til backend
        console.log(result);
        return{
            success: true,
            data: result.data
        };

    }catch(error){
        console.error("feil ved oppdatering (put) av eksisterende athlete", error)
        return{
            success: false
        }

    }
}



// registrere ny athlete, side 2 
const postAthlete = async (newAthlete: IAthlete, image: File) : Promise<IAthleteResponse> => {
    try{
        const response = await axios.post(endpoint, newAthlete); // poster athlete til backend
        console.log("response fra dataopplastning: ", response);

        // Må pakke inn bildefilen i formData slik at det kan tas imot av Controller som IFormFile
        const formData = new FormData();
        formData.append("file", image);

        // Her sendes bildet til ImageUploadController
        const response2 = await axios ({
            url: endpointImage,
            method: "POST",
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
        });

        console.log("response fra bildeopplastning: ", response2);

        // Tømmer formData før neste bildeopplast
        formData.delete("file");

        return{
            success: true,
            data: response.data
        }

    }catch(error){
        console.error("feil ved registrering av ny athlete (post) eller bildeopplastning", error)
        return{
            success: false
        }

    }
}


const deleteAthlete = async (id: number) : Promise <IAthleteResponse> => {
    try{
        const result = await axios.delete(`${endpoint}/${id}`);
        console.log(result);
        return{
            success: true,
        }

    }catch (error) {
        console.error ("feil evd sletting av utøver: ", error)
        return{
            success: false
        }

    }
}



export default {getAllAthletes, getAthleteById, getAthleteByName,updateAthlete, postAthlete, deleteAthlete}