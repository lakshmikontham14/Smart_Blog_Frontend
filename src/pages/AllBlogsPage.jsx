import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import { useQuery } from "@tanstack/react-query";
import BlogFilter from "@/ui_components/BlogFilter";
import { useState, useEffect } from "react";
import { useDebounce } from "@/ui_components/useDebounce";

const AllBlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 2000); // 500ms delay

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs", debouncedSearchTerm, categoryFilter],
    queryFn: () => getBlogs(debouncedSearchTerm, categoryFilter),
  });

  const blogs = data || [];

  function handleSearch(term) { // This function now serves to update the search term for both input display and query
    setSearchTerm(term);
  }

  function handleCategoryChange(category) {
    setCategoryFilter(category);
  }

  if (isPending) return <p>Loading blogs...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="">
      <BlogFilter
        searchTerm={searchTerm} // Pass the current search term to the filter component
        onSearch={handleSearch} // Pass the handler to update the search term (both display and query)
        onCategoryChange={handleCategoryChange}
      />
      {blogs.length > 0 ? (
        <BlogContainer isPending={isPending} blogs={blogs} />
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No posts found.</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default AllBlogsPage;
