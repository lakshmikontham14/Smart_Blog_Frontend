import Badge from "@/ui_components/Badge";
import BlogWriter from "@/ui_components/BlogWriter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getBlog } from "@/services/apiBlog";
import Spinner from "@/ui_components/Spinner";
import { BASE_URL } from "@/api";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
// import Modal from "@/ui_components/Modal"; // Removed Modal import
// import CreatePostPage from "./CreatePostPage"; // No longer needed for modal
// import { useState } from "react"; // No longer needed for modal
import { toast } from "react-toastify";

const DetailPage = ({ username, isAuthenticated }) => {
  const { slug } = useParams();
  // const [showModal, setShowModal] = useState(false); // Removed showModal state
  const navigate = useNavigate();
  // function toggleModal() { // Removed toggleModal function
  //   setShowModal((curr) => !curr);
  // }

  const {
    isPending,
    isError,
    error,
    data: blog,
  } = useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => getBlog(slug),
  });

  const blogID = blog?.id

  console.log(blog);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Your post has been deleted successfully!")
      navigate("/")
    },

    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    }
  })

  function handleDeleteBlog(){
    const popUp = window.confirm("Are you sure you want to delete this post?")
    if(!popUp){
      return;
    }

    deleteMutation.mutate(blogID)



  }

  

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Badge blog={blog} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground dark:text-primary-foreground">
            {blog.title}
          </h2>

          {isAuthenticated && username === blog.author.username && (
            <span className="flex items-center gap-4 mt-4 md:mt-0">
              <HiPencilAlt onClick={() => navigate(`/edit-post/${blog.slug}`)} className="text-2xl text-primary cursor-pointer hover:opacity-80 transition-opacity" />
              <MdDelete onClick={handleDeleteBlog} className="text-2xl text-destructive cursor-pointer hover:opacity-80 transition-opacity" />
            </span>
          )}
        </div>

        <BlogWriter blog={blog} />

        <div className="w-full h-80 md:h-96 my-8 overflow-hidden rounded-xl shadow-md">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={`${BASE_URL}${blog.featured_image}`}
            alt={blog.title}
          />
        </div>
        <p className="text-base leading-relaxed text-muted-foreground dark:text-gray-300">
          {blog.content}
        </p>
      </div>

    </div>
  );
};

export default DetailPage;
