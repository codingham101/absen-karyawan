'use client'
import { SyntheticEvent, useState } from "react";
import Alert from "../Alert/alert";
import { redirect } from "next/navigation";


export default function LoginPage(){
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('')
    const [txtEmail, settxtEmail] = useState("");
    const [txtPassword, settxtPassword] = useState("");

    const handleSubmit = async (e : SyntheticEvent) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:3100/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ txtEmail, txtPassword }),
        });
    
        const data = await response.json();
        console.log(data);
        if(data.payload.length != 0){
            redirect('/profil');
        }else{

        }
        
      };

      return(
        <div>
        <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Email Address" 
                        className="w-full input input-bordered input-primary" 
                        value={txtEmail}
                        onChange={(e) => settxtEmail(e.target.value)}
                        />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input 
                        type="password"
                        placeholder="Enter Password"
                        className="w-full input input-bordered input-primary" 
                        value={txtPassword}
                        onChange={(e) => settxtPassword(e.target.value)}
                        />
                        
                </div>
                <div>
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            </div>
      )
}