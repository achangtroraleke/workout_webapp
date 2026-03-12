import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function PrivateRoutes(){
     let {authToken} = useContext(AuthContext);

    return(authToken? <Outlet/>: <Navigate to={'/login'}/>)
    
}
// const PrivateRoutes = () =>{
//     let {authToken} = useContext(AuthContext);
//     return(authToken? <Outlet/>: <Navigate to={'/login'}/>)
// }

// export default PrivateRoutes;