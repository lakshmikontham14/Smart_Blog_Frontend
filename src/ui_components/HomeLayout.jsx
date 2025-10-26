import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const HomeLayout = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  });

  const blogs = data || [];
  const displayedBlogs = blogs.slice(0, 6);

  return (
    <div className="pt-4 pb-8">
      <Header />
      <BlogContainer isPending={isPending} blogs={displayedBlogs} />
      {blogs.length > 6 && (
        <div className="text-center mt-4">
          <Link
            to="/all-blogs"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Show More ...
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeLayout;

