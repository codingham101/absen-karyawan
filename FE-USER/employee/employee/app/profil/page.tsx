import Update from "./updateUser";

type user = {
    intUserId: BigInteger,
    txtName : string,
    txtEmail: string,
    txtNomorHP: string,
    txtRole: string,
    bitStatus: boolean,
    txtPassword: string

}


async function getUser() {
  const response = await fetch(`http://localhost:3100/HR/getUser`, {cache : "no-store"} );
  const data = await response.json();  
  return data.payload;
}

export default async function Profil() {
    const Users: user[] = await getUser();
    // console.log(users);
    return(
        
        <div>
            {Users.map(val=>(
                <div className="py-10 px-10">
                <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-24">
                            <span className="text-3xl">U</span>
                        </div>    
                    </div>
                    
                </figure>
                <div className="card-body" >
                    <h3 className="card-title">Nama : {val.txtName} </h3>
                    <h3 className="card-title">Email : {val.txtEmail}</h3>
                    <h3 className="card-title">Role : {val.txtRole}</h3>
                    <h3 className="card-title">Nomor HP : {val.txtNomorHP}</h3>

                    <div className="card-actions justify-end">
                    <Update {...val}/>
                    </div>
                </div>
                </div> 
                </div>
            ))}
        </div>
        
    )
    
}