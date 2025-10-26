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
    defaultValues: blog ? blog : {
      // description: "", // Removed description default value
    },
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
  });

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    // formData.append("description", data.description); // Removed description from formData

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
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-6 w-full max-w-lg rounded-xl bg-card dark:bg-card-foreground text-card-foreground dark:text-card shadow-lg ${blog ? "h-auto overflow-auto" : ""}`}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-4">
        <h3 className="font-bold text-3xl text-foreground dark:text-primary-foreground">
          {blog ? "Update Post" : "Create Post"}
        </h3>

        <p className="text-muted-foreground text-base text-center">
          {blog
            ? "Do you want to update your post?"
            : "Create a new post and share your ideas."}
        </p>
      </div>

      <div className="w-full space-y-2">
        <Label htmlFor="title" className="text-foreground dark:text-muted-foreground">
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
          className="w-full"
        />

        {errors?.title?.message && <InputError error={errors.title.message} />}
      </div>

      <div className="w-full space-y-2">
        <Label htmlFor="content" className="text-foreground dark:text-muted-foreground">Content</Label>
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
          className="w-full min-h-[180px]"
        />
        {errors?.content?.message && (
          <InputError error={errors.content.message} />
        )}
        <button
          type="button"
          onClick={handleGenerateDescription}
          disabled={isGenerating}
          className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90 h-10 px-4 py-2 mt-2"
        >
          {isGenerating ? (
            <>
              <SmallSpinner /> <SmallSpinnerText text="Generating..." />
            </>
          ) : (
            <SmallSpinnerText text="Generate Description with AI" />
          )}
        </button>
      </div>

      <div className="w-full space-y-2">
        <Label htmlFor="category" className="text-foreground dark:text-muted-foreground">Category</Label>

        <Select
          {...register("category", { required: "Blog's category is required" })}
          onValueChange={(value) => setValue("category", value)}
          defaultValue={blog ? blog.category : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
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

      <div className="w-full space-y-2">
        <Label htmlFor="featured_image" className="text-foreground dark:text-muted-foreground">Featured Image</Label>
        <Input
          type="file"
          id="picture"
          {...register("featured_image", {
            required: blog ? false : "Blog's featured image is required",
          })}
          className="w-full file:text-primary file:hover:opacity-80"
        />

        {errors?.featured_image?.message && (
          <InputError error={errors.featured_image.message} />
        )}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        {blog ? (
          <button
            disabled={updateMutation.isPending}
            className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 h-10 px-4 py-2"
          >
            {updateMutation.isPending ? (
              <>
                <SmallSpinner /> <SmallSpinnerText text="Updating post..." />
              </>
            ) : (
              <SmallSpinnerText text="Update post" />
            )}
          </button>
        ) : (
          <button
            disabled={mutation.isPending}
            className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 h-10 px-4 py-2"
          >
            {mutation.isPending ? (
              <>
                <SmallSpinner /> <SmallSpinnerText text="Creating post..." />
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
