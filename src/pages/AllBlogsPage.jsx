import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import { useQuery } from "@tanstack/react-query";
import BlogFilter from "@/ui_components/BlogFilter";
import { useState } from "react";

const AllBlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs", searchTerm, categoryFilter],
    queryFn: () => getBlogs(searchTerm, categoryFilter),
  });

  const blogs = data || [];

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function handleCategoryChange(category) {
    setCategoryFilter(category);
  }

  if (isPending) return <p>Loading blogs...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="">
      <BlogFilter onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
      <BlogContainer isPending={isPending} blogs={blogs} />
    </div>
  );
};

export default AllBlogsPage;
