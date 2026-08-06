import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){

    return(
        <header className="w-full h-[100px] bg-accent flex p-4 justify-between">
            <Link to="/" className="h-full">
                <img src="/bg3.png" alt="Logo" className="h-full"/>
            </Link>

            <div className="h-full text-primary flex items-center">
                
                <Link to="/" className="h-full flex items-center px-4 hover:bg-accent-dark">Home</Link>
                <Link to="/products" className="h-full flex items-center px-4 hover:bg-accent-dark">Products</Link>
                <Link to="/about" className="h-full flex items-center px-4 hover:bg-accent-dark">About</Link>


            </div>
            <div className="h-full flex items-center justify-between gap-6">
                <Link to="/cart">
                    <PiShoppingCartSimpleLight className="text-white text-4xl" />
                </Link>
                <UserData />
            </div>
        </header>
    )
    
}