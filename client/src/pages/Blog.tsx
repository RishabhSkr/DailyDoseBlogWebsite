import { useBlog } from "../Hooks"
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog(id || "");

    if(loading || !blog) {
        return <FullBlogSkeleton /> 
    }

    return <div>
        <FullBlog blog={blog} />
    </div>
}

export default Blog