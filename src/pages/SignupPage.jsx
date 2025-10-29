import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registerUser, updateProfile } from "@/services/apiBlog";
import InputError from "@/ui_components/InputError";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = ({ userInfo, updateForm, toggleModal }) => {

  console.log(userInfo)

  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset, watch } = useForm({defaultValues: userInfo ? userInfo : {}});
  const { errors } = formState;

  const password = watch("password");

  const updateProfileMutation = useMutation({
    mutationFn: (data) => updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully!")
      toggleModal()
      queryClient.invalidateQueries({queryKey: ["users", userInfo?.username]})
    },

    onError: (err) => {
      toast.error(err.message)
    }
  })

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      toast.success("You have successfully created an account!!!");
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    if(updateForm){
      const formData = new FormData()
      formData.append("username", data.username)
      formData.append("first_name", data.first_name)
      formData.append("last_name", data.last_name)
      formData.append("job_title", data.job_title)
      formData.append("bio", data.bio)

      if(data.profile_picture && data.profile_picture[0]){
        if(data.profile_picture[0] != "/"){
          formData.append("profile_picture", data.profile_picture[0])
        }
      }

      updateProfileMutation.mutate(formData)


    }

    else{
      const formData = new FormData()
      formData.append("username", data.username)
      formData.append("first_name", data.first_name)
      formData.append("last_name", data.last_name)
      formData.append("password", data.password)
      formData.append("password2", data.confirmPassword) // Assuming confirmPassword maps to password2 in the API
      mutation.mutate(formData)
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background dark:bg-card-foreground">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl w-full h-[650px]">
        {/* Left Section - Image Side */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0a0a2a] to-[#0a0a2a] p-8 items-center justify-center flex-col text-white">
          <div className="text-left w-full">
            <h2 className="text-2xl font-bold mb-2">DevScribe
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl italic font-bold mb-4">Create an account</h1>
            <p className="text-xl">Start your journey now with us</p>
          </div>
        </div>

        {/* Right Section - Signup Form */}
        <div className="w-full lg:w-1/2 p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-full max-w-md space-y-2 rounded-xl bg-card dark:bg-background text-card-foreground dark:text-foreground p-8 ${updateForm ? "h-auto overflow-auto" : ""}`}
          >
            <div className="flex flex-col gap-2 justify-center items-center mb-2">
              <h3 className="font-bold text-3xl text-foreground dark:text-primary-foreground">
                Create an account
              </h3>
            </div>

            {/* Username Input */}
            <div className="w-full space-y-2">
              <Label htmlFor="username" className="text-foreground dark:text-muted-foreground">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter username"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Username must be at least 3 characters" },
                })}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
              {errors?.username?.message && (
                <InputError error={errors.username.message} />
              )}
            </div>

            {/* First Name Input */}
            <div className="w-full space-y-2">
              <Label htmlFor="first_name" className="text-foreground dark:text-muted-foreground">First Name</Label>
              <Input
                type="text"
                id="first_name"
                placeholder="Enter first name"
                {...register("first_name", {
                  required: "Firstname is required",
                  minLength: { value: 3, message: "Firstname must be at least 3 characters" },
                })}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
              {errors?.first_name?.message && (
                <InputError error={errors.first_name.message} />
              )}
            </div>

            {/* Last Name Input */}
            <div className="w-full space-y-2">
              <Label htmlFor="last_name" className="text-foreground dark:text-muted-foreground">Last Name</Label>
              <Input
                type="text"
                id="last_name"
                placeholder="Enter last name"
                {...register("last_name", {
                  required: "Lastname is required",
                  minLength: { value: 3, message: "Lastname must be at least 3 characters" },
                })}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
              {errors?.last_name?.message && (
                <InputError error={errors.last_name.message} />
              )}
            </div>

            {updateForm && <div className="w-full space-y-2">
              <Label htmlFor="job_title" className="text-foreground dark:text-muted-foreground">
                Job Title
              </Label>
              <Input
                type="text"
                id="job_title"
                placeholder="Enter Job Title"
                {...register("job_title", {
                  required: "Your job title is required",
                  minLength: { value: 3, message: "Your job title must be at least 3 characters" },
                })}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
              {errors?.job_title?.message && (
                <InputError error={errors.job_title.message} />
              )}
            </div>}

            {updateForm && <div className="w-full space-y-2">
              <Label htmlFor="bio" className="text-foreground dark:text-muted-foreground">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us more about you"
                {...register("bio", {
                  required: "Your bio is required",
                  minLength: { value: 10, message: "The content must be at least 10 characters" },
                })}
                className="w-full min-h-[180px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
              {errors?.bio?.message && (
                <InputError error={errors.bio.message} />
              )}
            </div>}

            {updateForm && <div className="w-full space-y-2">
              <Label htmlFor="profile_picture" className="text-foreground dark:text-muted-foreground">Profile Picture</Label>
              <Input
                type="file"
                id="profile_picture"
                {...register("profile_picture", {
                  required: false,
                })}
                className="w-full file:text-blue-600 file:hover:opacity-80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
            </div>}

            <div className="w-full space-y-2">
              <Label htmlFor="password" className="text-foreground dark:text-muted-foreground">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
              {errors?.password?.message && (
                <InputError error={errors.password.message} />
              )}
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground dark:text-muted-foreground">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                  validate: (value) => value === password || "Passwords do not match",
                })}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
              {errors?.confirmPassword?.message && (
                <InputError error={errors.confirmPassword.message} />
              )}
            </div>

            <div className="w-full flex items-center justify-center flex-col mt-2">
              <button className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-blue-600 border border-blue-600 shadow-md hover:bg-blue-50 h-10 px-4 py-2">
                {mutation.isPending ? (
                  <>
                    <SmallSpinner />
                    <SmallSpinnerText text="Creating user..." />
                  </>
                ) : (
                  <SmallSpinnerText text="Create account" />
                )}
              </button>

              <p className="text-sm text-muted-foreground mt-4">
                Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
