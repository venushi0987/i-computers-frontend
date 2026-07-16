import { Link } from "react-router-dom";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

export default function Header() {
    return (
        <header className="w-full h-[100px] bg-accent flex p-4 justify-between">
            <Link to="/" className="h-full">
                <img src="/bg3.png" alt="Logo" className="h-full" />
            </Link>

            <div className="h-full text-primary flex items-cenetr">
                <Link to="/" className="h-full flex items-center px-4 hover:bg-accent-dark">Home</Link>
                <Link to="/products" className="h-full flex items-center px-4 hover:bg-accent-dark">Products</Link>
                <Link to="/about" className="h-full flex items-center px-4 hover:bg-accent-dark">About</Link>
            </div>

            <div className="w-[200px] h-full border border-white flex items-center text-white">
                <Link to="/cart" >
                <PiShoppingCartSimpleLight className="text-4xl text-white" />
                
                </Link>
            </div>
        </header>
    )
}