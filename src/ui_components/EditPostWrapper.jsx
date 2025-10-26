import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../services/apiBlog";
import CreatePostPage from "../pages/CreatePostPage";
import Spinner from "./Spinner";

const EditPostWrapper = ({ isAuthenticated }) => {
  const { slug } = useParams();

  const { isPending, data: blog, isError, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlog(slug),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return <CreatePostPage blog={blog} isAuthenticated={isAuthenticated} />;
};

export default EditPostWrapper;
