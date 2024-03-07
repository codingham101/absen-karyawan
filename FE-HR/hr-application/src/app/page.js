import AddUser from "@/component/AddUser";
import UserList from "../component/UserList";

const Home = async () => {

  const response = await fetch(`http://localhost:3100/HR/getUser`, {cache : "no-store"} );
  const retData = await response.json();
  return (

    <div className="py-10 px-10">
        <div className="py-2">
          <AddUser/>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          { retData.payload.map((data, index) =>{
            return(
            <UserList txtName = {data.txtName} txtEmail={data.txtEmail} txtRole={data.txtRole} index={index}/>
            )
          })}
          </tbody>
        </table>
      </div>


  );
}

export  default Home;