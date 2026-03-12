import { CiLogin } from "react-icons/ci";
import DynamicForm from "../components/DynamicForm";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function RegistrationForm(){
    const { registerUser } = useContext(AuthContext)
    const registrationFields = [

        {
            name:"username",
            label:"Username",
            type:"text",
            value:"",
        },
        {
            name:"email",
            label:"Email",
            type:"email",
            value:"",
        },
           {
      name: "password",
      label: "Password",
      type: "password",
      value: "",
    },             {
      name: "password2",
      label: "Re-type password",
      type: "password",
      value: "",
    },  

    ]
      // Example login function
  const submitForm = async (payload) => {
    console.log("Register Payload:", payload);
    
    return registerUser(payload)

    // Simulate API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (payload.email === "admin@example.com" && payload.password === "123456") {
          resolve("Login successful");
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  };
    return(
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Icon + Title */}
        <div className="flex justify-center mb-4">
       
        </div>
      
        {/* Dynamic Form */}
        <DynamicForm
          fields={registrationFields}
          submitFunc={submitForm}
          title="Create Your Account"
        />

        {/* Extra Links */}
        <div className="text-sm text-center mt-4">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    )
}