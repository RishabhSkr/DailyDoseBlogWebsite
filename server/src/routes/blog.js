import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from "zod";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@rishabh786/medium-common";
export const blogRouter = new Hono();
// middleware to check if user is authenticated
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        // Extract token from Bearer format
        const token = authHeader.split(" ")[1];
        if (!token) {
            c.status(401);
            return c.json({ message: "No token provided" });
        }
        const user = await verify(token, c.env.JWT_SECRET);
        if (user && user.id) {
            c.set("userId", user.id.toString());
            await next();
        }
        else {
            c.status(403);
            return c.json({ message: "Invalid token" });
        }
    }
    catch (e) {
        console.error(e);
        c.status(403);
        return c.json({ message: "Invalid token" });
    }
});
// blog routes
// if your code is throwing an error, you can return a response with status code and message
// return c.json({
//     success: false,
//     message: "Error creating blog",
//     error: error.message
// }, 500, {
//     'Content-Type': 'application/json'
// });
// Create Blog
blogRouter.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                success: false,
                message: "Inputs not correct"
            });
        }
        const authorId = c.get("userId");
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        // Check for existing blog with same title
        const existingBlog = await prisma.blog.findFirst({
            where: {
                title: body.title,
                authorId: Number(authorId)
            }
        });
        if (existingBlog) {
            c.status(409); // Conflict
            return c.json({
                success: false,
                message: "Blog with this title already exists"
            });
        }
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        });
        return c.json({
            success: true,
            message: "Blog created successfully",
            id: blog.id
        });
    }
    catch (error) {
        console.error(error);
        c.status(500);
        return c.json({
            success: false,
            message: "Error creating blog",
            error: error.message
        });
    }
});
// Update Blog
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    });
    return c.json({
        id: blog.id
    });
});
// Validation schema for pagination
const paginationSchema = z.object({
    page: z.string().transform(Number).default("1"),
    limit: z.string().transform(Number).default("10")
});
// get all blogs
blogRouter.get('/bulk', async (c) => {
    const { page, limit } = paginationSchema.parse({
        page: c.req.query('page'),
        limit: c.req.query('limit')
    });
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const total = await prisma.blog.count();
        const totalPages = Math.ceil(total / limit);
        if (page > totalPages && totalPages > 0) {
            c.status(400);
            return c.json({
                status: false,
                message: `Page number exceeds total pages (${totalPages})`,
            });
        }
        const skip = (page - 1) * limit;
        const blogs = await prisma.blog.findMany({
            skip,
            take: limit,
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        username: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        // console.log(blogs);
        return c.json({
            status: true,
            blogs,
            metadata: {
                total,
                page,
                limit,
                totalPages,
            },
        });
    }
    catch (error) {
        c.status(500);
        return c.json({
            status: false,
            error: 'Error fetching blogs',
        });
    }
});
blogRouter.get('/:id', async (c) => {
    try {
        // 1. URL se ID extract karo
        const id = c.req.param("id");
        // 2. UUID validation
        const idSchema = z.string().uuid();
        const result = idSchema.safeParse(id);
        if (!result.success) {
            c.status(400);
            return c.json({
                status: false,
                message: "Invalid UUID format"
            });
        }
        // 3. Prisma query
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const blog = await prisma.blog.findUnique({
            where: {
                id: id // String UUID
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        username: true
                    }
                }
            }
        });
        // 4. Blog not found check
        if (!blog) {
            c.status(404);
            return c.json({
                status: false,
                message: "Blog not found"
            });
        }
        // 5. Success response
        return c.json({
            status: true,
            blog
        });
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        c.status(500);
        return c.json({
            status: false,
            error: "Error fetching blog"
        });
    }
});
// Delete Blog by ID by its author
blogRouter.delete('/author/blogs/:id', async (c) => {
    try {
        // 1. Blog ID aur Author ID dono extract karo
        const blogId = c.req.param("id");
        const authorId = Number(c.get("userId")); // JWT se milega
        // 2. Blog ID validation (UUID format)
        const idSchema = z.string().uuid();
        const result = idSchema.safeParse(blogId);
        if (!result.success) {
            c.status(400);
            return c.json({
                status: false,
                message: "Invalid blog ID format"
            });
        }
        // 3. Prisma client initialize
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        // 4. Check if blog exists and belongs to author
        const blog = await prisma.blog.findUnique({
            where: {
                id: blogId
            }
        });
        if (!blog) {
            c.status(404);
            return c.json({
                status: false,
                message: "Blog not found"
            });
        }
        // 5. Verify author ownership
        if (blog.authorId !== authorId) {
            c.status(403);
            return c.json({
                status: false,
                message: "Unauthorized: You does not have a delete access"
            });
        }
        // 6. Delete the blog
        await prisma.blog.delete({
            where: {
                id: blogId
            }
        });
        return c.json({
            status: true,
            message: "Blog deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting blog:", error);
        c.status(500);
        return c.json({
            status: false,
            error: "Error deleting blog"
        });
    }
});
// Get all blogs by author
blogRouter.get('/author/blogs', async (c) => {
    try {
        // 1. Get author ID from JWT token
        const authorId = Number(c.get("userId"));
        // 2. Initialize Prisma
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        // 3. Fetch all blogs by author
        const blogs = await prisma.blog.findMany({
            where: {
                authorId: authorId
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // 4. Return response
        return c.json({
            status: true,
            blogs,
            count: blogs.length
        });
    }
    catch (error) {
        console.error("Error fetching author's blogs:", error);
        c.status(500);
        return c.json({
            status: false,
            error: "Error fetching blogs"
        });
    }
});
