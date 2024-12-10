import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@rishabh786/medium-common";
import axios from "axios";
import { SERVER_URL } from "../config";

export const Auth =  ({type}:{type:"signup" |"signin"}) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  })
  const sendRequest = async () => {
    try{
      const res = await axios.post(`${SERVER_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}` , postInputs);
      const jwt =res.data
      localStorage.setItem("token",jwt);
      alert("Signed in successfully");
      navigate("/blogs");      
    }catch(e){
      console.log(e);
      alert("Error while signing up");
    } 
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 mx-auto">
        <h1 className="text-3xl font-bold mb-8">{type === "signin" ? "Welcome Back! Login" : " Create an account"} </h1>
        <form className="space-y-6" onSubmit={(e)=>{
          e.preventDefault();
          sendRequest();
        }}>

          <div className="space-y-2">
            {type === "signup" ? (
                      <LabelledInput label ="Name" type = "text" placeholder="Rishabh Skr" onChange={(e)=>{
                        setPostInputs(
                          (prev)=>({
                            ...prev, 
                            name:e.target.value
                          }))
                      }}/>
                  ) : null}
            </div>
            

          <div className="space-y-2">
          
          
            <LabelledInput
              label="Email"
              type = "email"
              placeholder="rishabhskr@gmai.com"
              onChange={(e)=>{
                setPostInputs({
                  ...postInputs,
                  username : e.target.value
                })
              }}
            />
          </div>
          <div className="space-y-2">
            <LabelledInput
                label="Password"
                type = "password"
                placeholder="********"
                onChange={(e)=>{
                  setPostInputs({
                    ...postInputs,
                    password : e.target.value
                  })
                }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black hover:bg-slate-800 text-white font-semibold rounded-md transition duration-200"
          >
            {type == "signin" ? "Sign in" : "Sign up"}
          </button>

          <div className="space-y-2 text-slate-500"> 
               {type === "signup" ? "Already have an account?": "Don't have an account?"} 
                <Link to={type === "signup" ? "/signin" : "/signup  "} className="text-slate-8  00 font-semibold hover:underline ml-2">{type == "signin" ? "Sign up" : "Sign in"}</Link>
            </div>
        </form> 
      </div>
    </div>
  )
}


interface LabelledInputType {
  label: string; 
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type = "text" }: LabelledInputType) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        required
      />
    </div>
  );
}