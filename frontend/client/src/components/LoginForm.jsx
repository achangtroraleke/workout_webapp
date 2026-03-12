import { CiLogin } from "react-icons/ci";
import DynamicForm from "../components/DynamicForm";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";


export default function LoginForm() {
  const { loginUser } = useContext(AuthContext)

  let navigate = useNavigate();

  const loginFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      value: "",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: "",
    },
  ];

  // Example login function
  const submitLogin = async (payload) => {
    console.log("Login Payload:", payload);
    let res = await loginUser(payload)
    if(res.status === 201){
      navigate('/home')
    }
    



    // Simulate API request
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (payload.email === "admin@example.com" && payload.password === "123456") {
    //       resolve("Login successful");
    //     } else {
    //       reject(new Error("Invalid email or password"));
    //     }
    //   }, 1000);
    // });
  };

  return (
   
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Icon + Title */}
        <div className="flex justify-center mb-4">
         <CiLogin/>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

        {/* Dynamic Form */}
        <DynamicForm
          fields={loginFields}
          submitFunc={submitLogin}
          buttonName="Login"
        />

        {/* Extra Links */}
        <div className="text-sm text-center mt-4">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    
  );
}