// her skal "malen/oppskriften" for context ligge 

import { type IAthlete } from "./IAthlete";
import type { IAthletesResponse, IDefaultResponse } from "./ResponseInterfaces";

export interface IAthleteContext {
    athletes: IAthlete[],
    getAthleteQuantity: () => number, // denne MÅ ikke brukes, men kan 

    //side 1: 
    showAllAthletes: () => Promise<IAthletesResponse>, 
    showAthleteById: (id: number) => Promise<IDefaultResponse>,
    searchAthleteByName: (name: string) => Promise<IAthletesResponse>,

    updateAthlete: (updateAthlete: IAthlete) => Promise<IDefaultResponse>,
    removeAthlete: (id: number) => Promise<IDefaultResponse>,

    // til side 2: 
    // trenger ikke denne lenger da showAtleteById dekker search kravet på side 1: searchAthlete: (searchAthlete: string) => IAthlete[],
    registerAthlete: (newAthlete : IAthlete, image: File) => Promise <IDefaultResponse>,

   // trenger ikke denne mer (tror jeg): uploadAthleteImage: (imageFile: File) => Promise<IDefaultResponse>

}

