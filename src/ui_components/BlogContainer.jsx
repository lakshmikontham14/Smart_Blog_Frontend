import BlogCard from "./BlogCard"
import Spinner from "./Spinner"
import { useState } from "react"

const BlogContainer = ({isPending, blogs=[], title="Latest Posts"}) => {
  const [visibleBlogs, setVisibleBlogs] = useState(8)

  if(isPending){
    return <Spinner />
  }

  return (
    <section className="py-12 md:py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-foreground dark:text-primary-foreground">
      {title}
    </h2>

    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 justify-items-center">
      {blogs.slice(0, visibleBlogs).map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      
    </div>

    {visibleBlogs < blogs.length && (
      <div className="text-center mt-10">
        <button
          onClick={() => setVisibleBlogs((prev) => prev + 8)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Show More
        </button>
      </div>
    )}
  </section>
  )
}

export default BlogContainer
