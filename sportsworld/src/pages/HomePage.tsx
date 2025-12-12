import React from "react";

const HomePage = () =>{
    return(
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4">
                <h1 className="text-4xl font-bold">SportsWorld</h1>
                    <p className="text-lg">Velkommen!</p>
                    <p className="text-sm text gray-t500">En verden full av sport</p>
            </main>
        </div>
    )
}

export default HomePage;

