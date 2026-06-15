import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(){

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister(){

        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        api.post("/users/", 
            {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                confirmPassword: confirmPassword
            }
        ).then(() => {
            
            toast.success("Registration successful");

           navigate("/login");

        }
        ).catch((err) => {
            console.log(err);
            toast.error("Registration failed");
        });
    }

    return(
        <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-center flex justify-center items-center">
            <div className="w-[450px] backdrop-blur-md shadow-2xl rounded-lg p-6 flex flex-col items-center">

                <img src="/logo2.png" className="w-[70px] h-[70px] object-cover bg-white rounded-full"/>

                <label className="w-full mt-5 text-secondary font-semibold">Email</label>
                <input 
               
               value={email}
                onChange={
                    (e) => {
                        setEmail(e.target.value)}
                } 
                type="email" placeholder="user@gmail.com" className="w-full h-12 rounded-md border-2 border-accent focus:border-accent focus:outline-none px-3 bg-secondary/10"/>

                <div className="w-full flex flex-row gap-2">
                    <div className="w-1/2 flex flex-col">
                        <label className="w-full mt-5 text-secondary font-semibold">First Name</label>
                        <input
                            value={firstName}
                            onChange={
                                (e) => {
                                    setFirstName(e.target.value)
                                }   
                            }
                            type="text" placeholder="John" className="w-full h-12 rounded-md border-2 border-accent focus:border-accent focus:outline-none px-3 bg-secondary/10"/>
                        
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <label className="w-full mt-5 text-secondary font-semibold">Last Name</label>
                        <input
                            value={lastName}
                            onChange={
                                (e) => {
                                    setLastName(e.target.value)
                                }
                            }
                            type="text" placeholder="Doe" className="w-full h-12 rounded-md border-2 border-accent focus:border-accent focus:outline-none px-3 bg-secondary/10"/>
                    </div>
                </div>

                <label className="w-full mt-5 text-secondary font-semibold">Password</label>
                <input 
    
                value={password}
                onChange={
                    (e) => {
                        setPassword(e.target.value)}
                }
                type="password" placeholder="••••••••" className="w-full h-12 rounded-md border-2 border-accent focus:border-accent focus:outline-none px-3 bg-secondary/10"/>

                <label className="w-full mt-5 text-secondary font-semibold">Confirm Password</label>
                <input
                    value={confirmPassword}
                    onChange={
                        (e) => {
                            setConfirmPassword(e.target.value)
                        }
                    }
                    type="password" placeholder="••••••••" className="w-full h-12 rounded-md border-2 border-accent focus:border-accent focus:outline-none px-3 bg-secondary/10"/>

                <button onClick={handleRegister} className="w-full h-12 bg-accent text-white rounded-md mt-5 hover:bg-accent/80 transition">Register</button>

                <p className="w-full text-right">
                    Already have an account? <a href="/login" className="text-accent hover:underline">Login</a>
                </p>

                <button className="w-full h-12 bg-accent text-white rounded-md mt-5 hover:bg-accent/80 transition flex justify-center items-center gap-2"><FcGoogle />Register with Google</button>
            </div>
        </div>
    )
}