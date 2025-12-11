import AthleteForm from "../components/athletes/AthleteForm";
import AthleteList from "../components/athletes/AthleteList";
import AthleteEditForm from "../components/athletes/AthleteEditForm";
import AthleteDelete from "../components/athletes/AthleteDelete";
import { useAthleteAdmin } from "../components/athletes/hooks/UseAthleteAdmin";


const AthleteAdminPage = () => {

    const { athlteToEdit,
         athlteToDelete,
         startEdit,
         startDelete,
         handleUpdate,
         handleDelete,
         cancelEdit,
         cancelDelete,
        statusMessage}
     = useAthleteAdmin();

    return(
        <>
        <header >
            <h1 className="text-2xl"> Athlete AdminPage </h1>
            <p> Her kan du se alle forballspillere, søke etter dem på navn, endre eksisterende spillere og slette dem </p>
        </header>

        {/* Henter Form for å hente/vise søk og vis alle */}
        <AthleteForm></AthleteForm>

        {/* Endre eksisterende utøver*/}
        {athlteToEdit && (
            <section  >
                <div className="bg-blue-100 rounded-lg" >
                    <AthleteEditForm 
                    athlete={athlteToEdit}
                    saveEdit={handleUpdate}
                    closeEdit={cancelEdit}
                    ></AthleteEditForm>
                </div>
            </section>
        )}

        {/* Slette eksisterende utøver - husk tailwind styling i section og div tagger */}
        {athlteToDelete && (
        <section  >
            <div className="bg-red-200 rounded-lg" >
            
            <AthleteDelete 
            athlete={athlteToDelete}
            onConfirm = {handleDelete} // Kaller slettefunksjonen når det er bekreftet fra brukeren
            onCancel = {cancelDelete}
            ></AthleteDelete>
            </div>
        </section>
         )}

        {/* Henter Listen av spillere og sender funksjoner fra useAthleteAdmin */}
        <AthleteList 
        onEdit={startEdit}
        onDelete={startDelete}>
        </AthleteList>

        </>
    );
};




export default AthleteAdminPage;