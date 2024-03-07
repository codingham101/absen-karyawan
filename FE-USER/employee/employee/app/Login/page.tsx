
import LoginPage from "./loginPage"



export default async function Login(){

    
    

    return(
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-purple-700">User</h1>
            <LoginPage/>
        </div>
    </div>
    )
}