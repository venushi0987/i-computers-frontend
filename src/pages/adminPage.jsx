import { Link, Route, Routes } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { BsBox } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AddProductsForm from "./admin/adminAddProductsForm";
import EditProductsForm from "./admin/adminEditProductForm";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";


export default function AdminPage(){

    const userData = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userData.user || !userData.user.isAdmin){
            navigate("/login");
        }
    }, [userData, navigate]);


    return(
        <div className="flex w-full h-full text-secondary">
           <div className="w-[360px] h-full shadow-2xl flex flex-col">

            <div className="w-full h-[60px] flex items-center mb-2 gap-2">
                <img src="/bg4.png" alt="logo" className="w-[200px] h-[60px]"/>
                <span className="text-2xl font-bold">Admin</span>
            </div>

                <Link to="/admin" className="w-full flex item-center p-2 text-xl gap-2 mb-2 hover:bg-accent hover:text-white"><BsCart2 className="text-3xl"/>Orders</Link>
                <Link to="/admin/products" className="w-full flex item-center p-2 text-xl gap-2 mb-2 hover:bg-accent hover:text-white"><BsBox className="text-3xl"/>Products</Link>
                <Link to="/admin/users" className="w-full flex item-center p-2 text-xl gap-2 mb-2 hover:bg-accent hover:text-white"><FiUsers className="text-3xl"/>Users</Link>

           </div>
           <div className="w-[calc(100%-360px)] h-full bg-primary">
            <Routes>
                <Route path="/" element={<AdminOrdersPage />} />
                <Route path="/products" element={<AdminProductsPage />} />
                <Route path="/users" element={<AdminUsersPage />} />
                <Route path="/add-product" element={<AddProductsForm />} />
                <Route path="/edit-product" element={<EditProductsForm />} />
            </Routes>
           </div>

        </div>
    )
}

