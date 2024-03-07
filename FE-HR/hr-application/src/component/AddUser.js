'use client'
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";


const AddUser = () =>{
  const [txtName, settxtName] = useState("");
  const [txtEmail, settxtEmail] = useState("");
  const [txtNomorHP, settxtNomorHP] = useState("");
  const [txtRole, settxtRole] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const datatest = JSON.stringify({
        txtName,
        txtEmail,
        txtNomorHP,
        txtRole
      });
      console.log(datatest);
    setIsMutating(true);

    try{
        const response = await fetch("http://localhost:3100/HR/SaveUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: datatest,
          });
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
        
          const data = await response.json();
          console.log("Data fetched successfully:", data);

    }catch(error){
        console.error("Error:", error.message);
    }
    

    setIsMutating(false);

    settxtEmail("");
    settxtName("");
    settxtNomorHP("");
    settxtRole("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Employee</h3>
          <form>
            <div className="form-control">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                value={txtName}
                onChange={(e) => settxtName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Email</label>
              <input
                type="Email"
                value={txtEmail}
                onChange={(e) => settxtEmail(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Email"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Nomor HP</label>
              <input
                type="text"
                value={txtNomorHP}
                onChange={(e) => settxtNomorHP(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nomor HP"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Role</label>
              <input
                type="text"
                value={txtRole}
                onChange={(e) => settxtRole(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Role"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;