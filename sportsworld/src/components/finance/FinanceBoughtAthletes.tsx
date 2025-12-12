import { useContext } from "react";
import { AthleteContext } from "../../context/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import AthleteItem from "../athletes/AthleteItem";

const FinanceBoughtAthletes = () => {
    const athleteContext = useContext(AthleteContext) as IAthleteContext;
    const {athletes} = athleteContext;

    const boughtAthletes = athletes.filter(a => a.purchaseStatus);

    return(
        <section className="p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-grey-800">Dine utøvere</h3>
            {boughtAthletes.length === 0?(
                <p className="text-gray-600">Ingen utøvere kjøpt enda..</p>
            ):(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {boughtAthletes.map(a => (
                        <div key={a.id} className="w-full">
                            <AthleteItem athlete={a} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FinanceBoughtAthletes;