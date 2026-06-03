import { useState } from "react";
import toast from "react-hot-toast"

export default function TestPage(){

    const [status, setStatus] = useState("OFF");

    return(
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{status}</h1>
            <div className="w-75 h-[50px] flex justify-center items-center">

                <button onClick={
                    () => {
                        setStatus("ON");
                        toast.success("Turned On Successfully")
                    }
                } className="p-2 text-white m-2 bg-green-600">Turn On</button>

                <button onClick={
                    () => {
                        setStatus("OFF")
                        toast.error("The system is now off")
                    }
                } className="p-2 text-white m-2 bg-red-600">Turn Off</button>

                <button onClick={
                    () => {
                        setStatus("IDLE")
                    }
                } className="p-2 text-white m-2 bg-yellow-600">Idle</button>
            </div>
        </div>  
    )
}


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