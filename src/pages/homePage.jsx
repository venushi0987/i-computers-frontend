import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cartPage";

export default function HomePage(){
    return(
        <div className="min-h-full w-full bg-primary">
            <Header />
            <Routes>
                <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
                <Route path="/about" element={<h1>About Us</h1>} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/overview/:productId" element={<ProductOverview />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/*" element={<h1>404 - Page Not Found</h1>} />

            </Routes>

        </div>
           
    )
}
