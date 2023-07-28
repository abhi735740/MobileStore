import { Navigate, Outlet } from "react-router-dom";

const PrivateComponents = () => {
    const data = localStorage.getItem("result")
    return data ? <Outlet /> : <Navigate to="./SignUp" />
}
export default PrivateComponents;