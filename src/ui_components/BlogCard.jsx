import Badge from "./Badge";
import CardFooter from "./CardFooter";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/api";

const BlogCard = ({ blog }) => {
  return (
    <div
      className="
        group relative flex flex-col w-[350px] h-[400px]
        bg-white/70 dark:bg-gray-900/60
        border border-gray-200 dark:border-gray-800
        rounded-2xl overflow-hidden
        shadow-md hover:shadow-2xl
        backdrop-blur-md
        transition-all duration-500 ease-out
        hover:-translate-y-3 hover:scale-[1.03]
      "
    >
      {/* Thumbnail */}
      <Link to={`/blogs/${blog.slug}`} className="block h-48 overflow-hidden relative">
        <img
          src={`${BASE_URL}${blog.featured_image}`}
          alt={blog.title}
          className="
            w-full h-full object-cover 
            transition-transform duration-500 ease-out
            group-hover:scale-110
          "
        />

        {/* Subtle overlay effect */}
        <div
          className="
            absolute inset-0 bg-gradient-to-t from-black/40 via-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
          "
        ></div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <Badge blog={blog} />

        <Link to={`/blogs/${blog.slug}`} className="mt-3 block">
          <h3
            className="
              font-semibold text-xl leading-tight text-gray-900 dark:text-gray-100
              group-hover:text-primary transition-colors duration-300
              mb-3 line-clamp-2
            "
          >
            {blog.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
          {blog.excerpt || "Discover the latest insights and stories from our blog."}
        </p>

        <div className="mt-auto">
          <CardFooter blog={blog} />
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default BlogCard;
