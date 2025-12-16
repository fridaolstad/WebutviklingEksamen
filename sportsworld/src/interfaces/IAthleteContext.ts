// Her er "malen/oppskriften" for Athlete Context 

import { type IAthlete } from "./IAthlete";
import type { IAthletesResponse, IDefaultResponse } from "./ResponseInterfaces";

export interface IAthleteContext {
    athletes: IAthlete[],
   
    //side 1: 
    showAllAthletes: () => Promise<IAthletesResponse>, 
    showAthleteById: (id: number) => Promise<IDefaultResponse>,
    searchAthleteByName: (name: string) => Promise<IAthletesResponse>,

    updateAthlete: (updateAthlete: IAthlete) => Promise<IDefaultResponse>,
    removeAthlete: (id: number) => Promise<IDefaultResponse>,

    // til side 2: 
    registerAthlete: (newAthlete : IAthlete, image: File) => Promise <IDefaultResponse>,

}

