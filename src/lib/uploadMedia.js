import { createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";


const supabaseUrl = "https://krwqxzjcdqdosynlxiyd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd3F4empjZHFkb3N5bmx4aXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NzE4MTUsImV4cCI6MjA5NzA0NzgxNX0.L_1W6J7K1CYQtWLWsLf06_Eh_Hkw01M-BzHpLv1qTWc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function uploadMedia(file){
    return new Promise((resolve, reject) => {
       if(file == null){
        reject("No file selected");
       
       }else{
            const timestamp =  new Date().getTime();

            const fileName = timestamp + "_" + file.name;

            supabase.storage
            .from("images")
            .upload(fileName, file)
            .then(() => {
                const publicUrl = supabase
                .storage.from("images")
                .getPublicUrl(fileName).data.publicUrl;

                resolve(publicUrl);

                toast.success("File uploaded successfully");
            
            })

            .catch((err) => {
                reject(err);
            });
        }
    });
}