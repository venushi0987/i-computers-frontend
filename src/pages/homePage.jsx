import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cartPage";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settingsPage";
import LandingPage from "./landingPage";
import AboutPage from "./aboutPage";

export default function HomePage(){
    return(
        <div className="min-h-full w-full bg-primary pb-[80px] lg:pb-0">
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/overview/:productId" element={<ProductOverview />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/*" element={<h1>404 - Page Not Found</h1>} />

            </Routes>

        </div>
           
    )
}
