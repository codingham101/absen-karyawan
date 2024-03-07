"use client";
type user = {
    intUserId: BigInteger,
    txtName : string,
    txtEmail: string,
    txtNomorHP: string,
    txtRole: string,
    bitStatus: boolean,
    txtPassword: string
}

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Update(users : user) {
    const [txtName, settxtName] = useState(users.txtName)
    const [txtEmail, settxtEmail] = useState(users.txtEmail);
    const [txtNomorHP, settxtNomorHP] = useState(users.txtNomorHP);
    const [txtRole, settxtRole] = useState(users.txtRole);
    const [txtPassword, settxtPassword] = useState(users.txtPassword);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e : SyntheticEvent) {
    e.preventDefault;
    const datatest = JSON.stringify({intUserId : users.intUserId, txtPassword, txtNomorHP});
    console.log(datatest);
    setIsMutating(true);

    await fetch("http://localhost:3100/user/Update", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: datatest
    });

    // setIsMutating(false);
    // setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Update
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
          <div className="form-control">
              <label className="label font-bold">Nama</label>
              <p>{txtName}</p>
            </div>
            <div className="form-control">
              <label className="label font-bold">Email</label>
              <p>{txtEmail}</p>
            </div>
            <div className="form-control">
              <label className="label font-bold">Role</label>
              <p>{txtRole}</p>
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
              <label className="label font-bold">Password</label>
              <input
                type="text"
                value={txtPassword}
                onChange={(e) => settxtPassword(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Password"
              />
            </div>
            
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}