// her skal "malen/oppskriften" for context ligge 

// se rolandos cake kode for oppsett :))

import { type IAthlete } from "./IAthlete";
import type { IDefaultResponse } from "./ResponseInterfaces";

export interface IAthleteContext {
    athletes: IAthlete[],
    getAthleteQuantity: () => number, // denne MÅ ikke brukes, men kan 

    //side 1: 
    showAllAthletes: () => Promise<IDefaultResponse>, 
    showAthleteById: (id: number) => Promise<IDefaultResponse>,
    showAthleteByName: (name: string) => Promise<IDefaultResponse>,

    updateAthlete: (updateAthlete: IAthlete) => Promise<IDefaultResponse>,
    removeAthlete: (id: number) => Promise<IDefaultResponse>,

    // til side 2: 
    searchAthlete: (searchAthlete: string) => IAthlete[],
    registerAthlete: (newAthlete : IAthlete) => Promise <IDefaultResponse>,

    uploadAthleteImage: (imageFile: File) => Promise<IDefaultResponse>

}

