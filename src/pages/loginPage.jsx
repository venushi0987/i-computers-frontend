import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(){

        //  axios.post("http://localhost:3000/users/login", 
        //     {
        //         email: email, 
        //         password: password
        //     }
        // )
        api.post("/users/login", 
            {
                email: email, 
                password: password
            }
        ).then((res) => {
            
            toast.success("Login successful");

            //token store user browser local storage
            localStorage.setItem("token", res.data.token);

            if(res.data.isAdmin){
                navigate("/admin");
            }else{
                navigate("/");
            }

        }
        ).catch((err) => {
            console.log(err);
            toast.error("Login failed");
        });
    }

    return(
        <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-center flex justify-center items-center">
            <div className="w-[450px] h-[580px] backdrop-blur-md shadow-2xl rounded-lg p-6 flex flex-col items-center">

                <img src="/logo2.png" className="w-[70px] h-[70px] object-cover bg-white rounded-full"/>
                <h1 className="text-3xl font-bold text-secondary mt-5">Login</h1>

                <label className="w-full mt-5 text-secondary font-semibold">Email</label>
                <input 
               
                value={email}
                onChange={
                    (e) => {
                        setEmail(e.target.value)
                    }
                } 
                type="email" placeholder="user@gmail.com" className="w-full h-12 rounded-md border-2 border-accent focus:border-accent focus:outline-none px-3 bg-secondary/10"/>

                <label className="w-full mt-5 text-secondary font-semibold">Password</label>
                <input 

                value={password}
                onChange={
                    (e) => {
                        setPassword(e.target.value)}
                }
                type="password" placeholder="••••••••" className="w-full h-12 rounded-md border-2 border-accent focus:border-accent focus:outline-none px-3 bg-secondary/10"/>

                <p className="w-full text-secondary text-right">Forget password? <a href="/reset-password" className="text-accent hover:underline">reset here</a></p>

                <button onClick={handleLogin} className="w-full h-12 bg-accent text-white rounded-md mt-5 hover:bg-accent/80 transition">Login</button>

                <p className="w-full text-right">
                    Don't have an account? <a href="/register" className="text-accent hover:underline">Register</a>
                </p>

                <button className="w-full h-12 bg-accent text-white rounded-md mt-5 hover:bg-accent/80 transition flex justify-center items-center gap-2"><FcGoogle />Login with Google</button>
            </div>
        </div>
    )
}