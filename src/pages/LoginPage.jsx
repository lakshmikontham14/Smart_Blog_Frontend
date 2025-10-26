import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getUsername, signin } from "@/services/apiBlog";
import { toast } from "react-toastify";
import SmallSpinner from "@/ui_components/SmallSpinner";
import InputError from "@/ui_components/InputError";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";

const LoginPage = ({setIsAuthenticated, setUsername}) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const location = useLocation()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (data) => signin(data),
    onSuccess: (response) => {
        localStorage.setItem("access", response.access)
        localStorage.setItem("refresh", response.refresh)
        setIsAuthenticated(true)
        getUsername().then(res => setUsername(res.username))
        toast.success("You have successfully signed in!");
        const from = location?.state?.from?.pathname || "/"
        navigate(from, {replace:true})

    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    console.log(data);
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background dark:bg-card-foreground">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl w-full h-[650px]">
        {/* Left Section - Image Side */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0a0a2a] to-[#0a0a2a] p-8 items-center justify-center flex-col text-white">
          <div className="text-left w-full">
            <h2 className="text-2xl font-bold mb-2">BALA.</h2>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl italic font-bold mb-4">Login page</h1>
            <p className="text-xl">Start your journey now with us</p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-2 rounded-xl bg-card dark:bg-background text-card-foreground dark:text-foreground p-8 mx-auto"
          >
            <div className="flex flex-col gap-2 justify-center items-center mb-2">
              <h3 className="font-bold text-3xl text-foreground dark:text-primary-foreground">Login to your account</h3>
              {/* <p className="text-muted-foreground text-base text-center">Welcome back! Log in to continue.</p> */}
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor="username" className="text-foreground dark:text-muted-foreground">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                disabled={mutation.isPending}
                placeholder="Enter username"
                {...register("username", { required: "Username is required" })}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
              />
              {errors?.username?.message && (
                <InputError error={errors.username.message} />
              )}
            </div>

            <div className="w-full space-y-2 relative">
              <Label htmlFor="password" className="text-foreground dark:text-muted-foreground">Password</Label>
              <Input
                type="password"
                id="password"
                disabled={mutation.isPending}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 text-sm leading-5 font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
              >
                Forgot ?
              </button>
              {errors?.password?.message && (
                <InputError error={errors.password.message} />
              )}
            </div>

            <div className="w-full flex items-center justify-center flex-col mt-2">
              <button disabled={mutation.isPending} className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-blue-600 border border-blue-600 shadow-md hover:bg-blue-50 h-10 px-4 py-2">
                {mutation.isPending ? (
                  <>
                    <SmallSpinner />
                    <SmallSpinnerText text="Logging in..." />
                  </>
                ) : (
                  <SmallSpinnerText text="Login now" />
                )}
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
