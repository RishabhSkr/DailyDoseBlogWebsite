import axios from "axios";
import { useEffect, useState } from "react";
const SERVER_URL  = import.meta.env.VITE_API_URL;

export interface Blog {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    author: {
        name: string;
        username: string;
    }
}

export interface BlogsResponse {
    status: boolean;
    blogs: Blog[];
    metadata: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}

// get single blog 
export const useBlog = (id:string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            if (response.data.status) {
                setBlog(response.data.blog);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blog:", error);
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog
    }
}

// get all blogs
export const useBlogs = (page: number = 1, limit: number = 10) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [metadata, setMetadata] = useState<BlogsResponse['metadata'] | null>(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                page,
                limit
            }
        })
        .then(response => {
            if (response.data.status) {
                const blogsData = response.data.blogs.map((blog: Blog) => ({
                    ...blog,
                    createdAt: blog.createdAt && !isNaN(Date.parse(blog.createdAt)) ? blog.createdAt : "NoDate"
                }));
                setBlogs(blogsData);
                setMetadata(response.data.metadata);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, [page, limit]);

    return { loading, blogs, metadata };
}