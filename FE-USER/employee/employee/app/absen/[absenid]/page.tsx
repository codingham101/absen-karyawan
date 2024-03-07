type user = {
    intUserId: BigInteger,
    txtName : string,
    txtEmail: string,
    txtNomorHP: string,
    txtRole: string,
    bitStatus: boolean,
    txtPassword: string

}

export default async function Absen({params} : {params: {absenid: BigInteger}}){
    const {absenid} = params;
    const Users: user = await getUser({absenid});
    // console.log(users);
    return(
        
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
                <h3 className="card-title">Nama : {Users.txtName} </h3>
                <h3 className="card-title">Email : {Users.txtEmail}</h3>
                <h3 className="card-title">Role : {Users.txtRole}</h3>
                <h3 className="card-title">Nomor HP : {Users.txtNomorHP}</h3>

                <div className="card-actions justify-end">
                
                </div>
            </div>
            </div> 
            </div>

    )

}
async function getUser({params} : {params: {absenid: BigInteger}}) {
    const response = await fetch("http://localhost:3100/user/Update", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({intUserId : params})
      });
    const data = await response.json();  
    return data.payload;
  }