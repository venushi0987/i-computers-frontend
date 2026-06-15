//file upload part

import { useState } from "react";
import {createClient} from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import uploadMedia from "../lib/uploadMedia";



export default function TestPage(){

    const [file, setFile] = useState(null);

    function uploadFile(){
        uploadMedia(file).then(
            (res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            }
        );

        
    }

    return(
        <div className="w-full h-full flex justify-center items-center">
            <input type = "file" 
            //multiple = {true}
            onChange={
                (e) =>{
                    setFile(e.target.files[0]);
                }}/>

            <button onClick={uploadFile} className="p-2 text-white m-2 bg-blue-600 rounded-lg">Upload</button>
        </div>
    )
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd3F4empjZHFkb3N5bmx4aXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NzE4MTUsImV4cCI6MjA5NzA0NzgxNX0.L_1W6J7K1CYQtWLWsLf06_Eh_Hkw01M-BzHpLv1qTWc
//https://krwqxzjcdqdosynlxiyd.supabase.co

// import { useState } from "react";
// import toast from "react-hot-toast"

// export default function TestPage(){

//     const [status, setStatus] = useState("OFF");

//     return(
//         <div className="w-full h-full flex flex-col items-center justify-center">
//             <h1 className="text-3xl font-bold">{status}</h1>
//             <div className="w-75 h-[50px] flex justify-center items-center">

//                 <button onClick={
//                     () => {
//                         setStatus("ON");
//                         toast.success("Turned On Successfully")
//                     }
//                 } className="p-2 text-white m-2 bg-green-600">Turn On</button>

//                 <button onClick={
//                     () => {
//                         setStatus("OFF")
//                         toast.error("The system is now off")
//                     }
//                 } className="p-2 text-white m-2 bg-red-600">Turn Off</button>

//                 <button onClick={
//                     () => {
//                         setStatus("IDLE")
//                     }
//                 } className="p-2 text-white m-2 bg-yellow-600">Idle</button>
//             </div>
//         </div>  
//     )
// }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// export default function TestPage(){

//     return(
//         <div className="w-full h-full">
//             <div className="w-[280px] h-[280px] bg-yellow-300 p-[10px] m-4">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur soluta ipsum sunt inventore dolores rerum autem at numquam libero nobis totam porro a sapiente tenetur eaque sint excepturi corrupti aperiam culpa, amet, laborum est sed. Nam reiciendis neque aliquid ullam temporibus, ducimus odit.
//             </div>
//             <div className="w-[280px] h-[280px] bg-yellow-300 p-[10px] m-4">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur soluta ipsum sunt inventore dolores rerum autem at numquam libero nobis totam porro a sapiente tenetur eaque sint excepturi corrupti aperiam culpa, amet, laborum est sed. Nam reiciendis neque aliquid ullam temporibus, ducimus odit.
//             </div>
//             <div className="w-[280px] h-[280px] bg-yellow-300 p-[10px] m-4">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur soluta ipsum sunt inventore dolores rerum autem at numquam libero nobis totam porro a sapiente tenetur eaque sint excepturi corrupti aperiam culpa, amet, laborum est sed. Nam reiciendis neque aliquid ullam temporibus, ducimus odit.
//             </div>
//             <div className="w-[280px] h-[280px] bg-yellow-300 p-[10px] m-4">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur soluta ipsum sunt inventore dolores rerum autem at numquam libero nobis totam porro a sapiente tenetur eaque sint excepturi corrupti aperiam culpa, amet, laborum est sed. Nam reiciendis neque aliquid ullam temporibus, ducimus odit.
//             </div>
//         </div>
//     )
// }

// Alignments and positions in CSS
// export default function TestPage(){

//     return(
//         <div className="w-full h-full">
//             <div className="flex flex-col relative w-[600px] h-[600px] justify-center items-center gap-1 bg-yellow-300">
//                 <div className="w-[100px] h-[100px] bg-red-600"></div>
//                 <div className=" fixed right-10 bottom-10 w-[100px] h-[100px] bg-green-600"></div>
//                 <div className="absolute right-0 top-0 w-[100px] h-[100px] bg-blue-600"></div>
//                 <div className="w-[100px] h-[100px] bg-white"></div>
//                 <div className="w-[100px] h-[100px] bg-black"></div>
//             </div>
//         </div>
//     )
// }