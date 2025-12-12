import AthleteList from "../components/athletes/AthleteList";
import AthleteRegisterForm from "../components/athletes/AthleteRegisterForm";

// legge til AthleteItem nede i return?

const AthleteRegisterPage = () => {
    return(
        <>
        <div className="p-6 max-w-7x1 mx-auto">
            <header>
               <h1 className="text-3xl font-bold mb-8"> Registering av ny spiller  </h1>
            </header>
        
        <AthleteRegisterForm></AthleteRegisterForm>
        <AthleteList></AthleteList>

        </div>
        </>
    )
}

export default AthleteRegisterPage;