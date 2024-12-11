import { Blog } from "../Hooks"
import { Avatar } from "../components/BlogCards"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const SERVER_URL  = import.meta.env.VITE_API_URL;

export const FullBlog = ({ blog }: {blog: Blog}) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");  
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${SERVER_URL}/api/v1/blog/author/blogs/${blog.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "userId": userId
                }
            });
            
            if (response.data.status) {
                alert("Blog deleted successfully");
                navigate("/blogs");
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "Error deleting blog");
            console.error("Error deleting blog:", error);
        }
    };

    const formattedDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'No date';
    return <div>
        <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 px-3 sm:px-4 md:px-6 w-full max-w-screen-xl pt-4 sm:pt-8 md:pt-12 gap-4 md:gap-8">
                <div className="lg:col-span-8 order-2 lg:order-1">
                    <div className="text-2xl sm:text-3xl md:text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-1 sm:pt-2 text-sm sm:text-base">
                        {"Posted on "+ formattedDate}
                    </div>
                    {userId === blog.author.username && (
                        <div className="pt-2">
                            <button 
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base"
                            >
                                Delete this Blog
                            </button>
                        </div>
                    )}
                    <div className="pt-3 sm:pt-4">
                        <div className="prose prose-sm lg:prose-xl max-w-none">
                            <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="leading-relaxed whitespace-pre-wrap text-gray-800 text-base sm:text-lg">
                                    {blog.content.split('\n').map((paragraph, index) => (
                                        paragraph.trim() && (
                                            <p key={index} className="mb-3 sm:mb-4 last:mb-0">
                                                {paragraph}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 order-1 lg:order-2 mb-4 lg:mb-0">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-slate-600 text-base sm:text-lg mb-3 sm:mb-4">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-3 sm:pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div className="flex-1">
                                <div className="text-lg sm:text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-1 sm:pt-2 text-slate-500 text-sm sm:text-base">
                                    {blog.author.name} is a passionate writer who loves to write about various topics.
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
}