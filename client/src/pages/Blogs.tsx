import { BlogCards } from "../components/BlogCards"
import { useBlogs } from "../Hooks"
import { useState } from "react";
import { BlogSkeleton } from "../components/BlogSkeleton";
const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, blogs, metadata } = useBlogs(currentPage);

    if (loading || !blogs) {
        return <div>
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }


    return (
      <div>
        <div className="max-w-4xl mx-auto py-8">
              <h1 className="text-2xl font-bold mb-6 ml-2">Latest Blogs</h1>
              <div className="space-y-4 ml-4">
                  {blogs.map(blog => (
                      <BlogCards
                          key={blog.id}
                          id={blog.id}
                          authorName={blog.author.name}
                          title={blog.title}
                          content={blog.content}
                          publishedDate={blog.createdAt}
                      />
                  ))}
              </div>

              
              
              {metadata && (
                  <div className="flex justify-center gap-4 mt-8">
                      <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                      >
                          Previous
                      </button>
                      <span className="px-4 py-2">
                          Page {currentPage} of {metadata.totalPages}
                      </span>
                      <button
                          onClick={() => setCurrentPage(p => p + 1)}
                          disabled={currentPage >= metadata.totalPages}
                          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                      >
                          Next
                      </button>
                  </div>
              )}
          </div>
      </div>
    )
}

export default Blogs;