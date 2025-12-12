import AthleteList from "../components/athletes/AthleteList";
import AthleteRegisterForm from "../components/athletes/AthleteRegisterForm";

// legge til AthleteItem nede i return?

const AthleteRegisterPage = () => {
    return(
        <>
        <div className="p-6 max-w-7x1 mx-auto bg-blue-300">
            <header>
               <h1 className="text-3xl font-bold"> Registering av ny spiller  </h1>
               <p className=""> Her kan du registrere en ny spiller  </p>
            </header>
        
        <AthleteRegisterForm></AthleteRegisterForm>
        <AthleteList></AthleteList>

        </div>
        </>
    )
}

export default AthleteRegisterPage;