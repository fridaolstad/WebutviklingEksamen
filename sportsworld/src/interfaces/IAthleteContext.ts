// her skal "malen/oppskriften" for context ligge 

// se rolandos cake kode for oppsett :))

import { type IAthlete } from "./IAthlete";
import type { IDefaultResponse } from "./ResponseInterfaces";

export interface IAthleteContext {
    athletes: IAthlete[],
    getAthleteQuantity: () => number, // denne MÅ ikke brukes, men kan 

    showAllAthletes: () => Promise<IDefaultResponse>, 
    updateAthlete: (updateAthlete: IAthlete) => Promise<IDefaultResponse>, // chat mener jeg kan ta bort denne
    removeAthlete: (id: number) => Promise<IDefaultResponse>,
    searchAthlete: (searchAthlete: string) => IAthlete[],

    saveAthlete : (newAthlete : IAthlete) => Promise <IDefaultResponse> 

}

