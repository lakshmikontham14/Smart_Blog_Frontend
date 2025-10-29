import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import InputError from "@/ui_components/InputError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, updateBlog, generateAIDescription } from "@/services/apiBlog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";
import LoginPage from "./LoginPage";

const CreatePostPage = ({ blog, isAuthenticated }) => {
  const { register, handleSubmit, formState, setValue, getValues } = useForm({
    defaultValues: blog ? blog : {},
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const blogID = blog?.id;

  const updateMutation = useMutation({
    mutationFn: ({ data, id }) => updateBlog(data, id),
    onSuccess: () => {
      navigate("/");
      toast.success("Your post has been updated successfully!");
      console.log("Your post has been updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log("Error updating blog", err);
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => createBlog(data),
    onSuccess: () => {
      toast.success("New post added successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log("Error creating blog", err);
    },
  });

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);

    if (data.featured_image && data.featured_image[0]) {
      if (data.featured_image[0] != "/") {
        formData.append("featured_image", data.featured_image[0]);
      }
    }

    if (blog && blogID) {
      updateMutation.mutate({ data: formData, id: blogID });
    } else {
      mutation.mutate(formData);
    }
  }

  if (isAuthenticated === false) {
    return <LoginPage />;
  }

  const { mutate: generateDescription, isPending: isGenerating } = useMutation({
    mutationFn: (content) => generateAIDescription(content),
    onSuccess: (data) => {
      setValue("content", data.description);
      toast.success("Description generated successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log("Error generating description", err);
    },
  });

  function handleGenerateDescription() {
    const title = getValues("title");
    if (!title) {
      toast.error("Please write a title to generate a description.");
      return;
    }
    generateDescription(title);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`my-6 px-6 py-4 flex flex-col items-center gap-2 w-full max-w-xl mx-auto rounded-2xl 
      bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100 shadow-xl border border-gray-200 dark:border-gray-700 
      transition-colors duration-300 ${blog ? "h-auto overflow-auto" : ""}`}
    >
      {/* Header */}
      <div className="flex flex-col gap-2 justify-center items-center mb-4">
        <h3 className="font-bold text-3xl text-gray-900 dark:text-gray-100">
          {blog ? "Update Post" : "Create Post"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-base text-center">
          {blog
            ? "Do you want to update your post?"
            : "Create a new post and share your ideas."}
        </p>
      </div>

      {/* Title */}
      <div className="w-full space-y-2">
        <Label htmlFor="title" className="text-gray-800 dark:text-gray-300">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "Blog's title is required",
            minLength: {
              value: 3,
              message: "The title must be at least 3 characters",
            },
          })}
          placeholder="Give your post a title"
          className="w-full bg-gray-50 dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 
          text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg 
          focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
        />
        {errors?.title?.message && <InputError error={errors.title.message} />}
      </div>

      {/* Content */}
      <div className="w-full space-y-2">
        <Label htmlFor="content" className="text-gray-800 dark:text-gray-300">
          Content
        </Label>
        <Textarea
          id="content"
          placeholder="Write your blog post"
          {...register("content", {
            required: "Blog's content is required",
            minLength: {
              value: 10,
              message: "The content must be at least 10 characters",
            },
          })}
          className="w-full min-h-[180px] bg-gray-50 dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 
          text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 
          focus:ring-primary focus:border-primary transition-colors duration-300"
        />
        {errors?.content?.message && <InputError error={errors.content.message} />}

        {/* AI Generate Button */}
        <button
          type="button"
          onClick={handleGenerateDescription}
          disabled={isGenerating}
          className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:pointer-events-none disabled:opacity-50 bg-gray-200 dark:bg-[#3a3a3a] text-gray-800 dark:text-gray-100 
          shadow-md hover:bg-gray-300 dark:hover:bg-[#4a4a4a] h-10 px-4 py-2 mt-2"
        >
          {isGenerating ? (
            <>
              <SmallSpinner /> <SmallSpinnerText text="Generating..." className="text-gray-800 dark:text-gray-100" />
            </>
          ) : (
            <SmallSpinnerText text="Generate Description with AI" />
          )}
        </button>
      </div>

      {/* Category */}
      <div className="w-full space-y-2">
        <Label htmlFor="category" className="text-gray-800 dark:text-gray-300">
          Category
        </Label>
        <Select
          {...register("category", { required: "Blog's category is required" })}
          onValueChange={(value) => setValue("category", value)}
          defaultValue={blog ? blog.category : ""}
        >
          <SelectTrigger
            className="w-full bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 
            border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100">
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Fullstack">Fullstack</SelectItem>
              <SelectItem value="Web3">Web3</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors?.category?.message && (
          <InputError error={errors.category.message} />
        )}
      </div>

      {/* Image Upload */}
      <div className="w-full space-y-2">
        <Label htmlFor="featured_image" className="text-gray-800 dark:text-gray-300">
          Featured Image
        </Label>
        <Input
          type="file"
          id="picture"
          {...register("featured_image", {
            required: blog ? false : "Blog's featured image is required",
          })}
          className="w-full bg-gray-50 dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 
          text-gray-900 dark:text-gray-100 file:text-primary hover:file:opacity-80 rounded-lg"
        />
        {errors?.featured_image?.message && (
          <InputError error={errors.featured_image.message} />
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full flex items-center justify-center flex-col my-4">
        {blog ? (
          <button
            disabled={updateMutation.isPending}
            className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium 
            bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md 
            h-10 px-4 py-2 transition-colors duration-300"
          >
            {updateMutation.isPending ? (
              <>
                <SmallSpinner /> <SmallSpinnerText text="Updating post..." className="text-white" />
              </>
            ) : (
              <SmallSpinnerText text="Update post" />
            )}
          </button>
        ) : (
          <button
            disabled={mutation.isPending}
            className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium             
            shadow-md 
            h-10 px-4 py-2 transition-colors duration-300"
          >
            {mutation.isPending ? (
              <>
                <SmallSpinner /> <SmallSpinnerText text="Creating post..." className="text-white" />
              </>
            ) : (
              <SmallSpinnerText text="Create post" />
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default CreatePostPage;
