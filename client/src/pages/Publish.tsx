import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const SERVER_URL  = import.meta.env.VITE_API_URL;
export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const handlepublishPost = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to publish");
                navigate("/signin");
                return;
            }

            const response = await axios.post(`${SERVER_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.data.id) {
                alert("Blog published successfully");
                navigate(`/blog/${response.data.id}`);
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to publish blog");
        }
    }
    return <div>
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                <button onClick={handlepublishPost} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-slate-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-green-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}