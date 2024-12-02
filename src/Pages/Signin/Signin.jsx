import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signinImage from "../../assets/Forgot-password-rafiki.svg"
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";




const Signin = () => {
  const { signIn } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'

  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast.success('Log in Successful');
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.error('Sign in error:', error);
        toast.error('An error occurred while signing in');
      });
  }
return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative w-full max-w-3xl bg-white  shadow-lg perspective-1500 flex">

      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 p-8 space-y-4 w-[50%]">
        <h1 className="text-3xl text-center font-bold text-red-500">Sign In</h1>
        <div className="relative">
          <i className="fas fa-envelope absolute left-3 top-3 text-red-500"></i>
          <input
            type="text"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="w-full pl-10 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
          />
          {errors.email && <span className="text-red-600">Email is required</span>}
        </div>
        <div className="relative">
          <i className="fas fa-lock absolute left-3 top-3 text-red-500"></i>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="w-full pl-10 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
          />
          {errors.password && <span className="text-red-600">Password is required</span>}
        </div>
        <button type="submit" className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-500 transition duration-300">Submit</button>
        <p className="text-center text-sm  text-black">Dont have an account? <Link to="/signup" htmlFor="flip" className="text-red-500 cursor-pointer hover:underline">Sign up now</Link></p>
      </form>
      <div className="bg-red-500  w-[50%]">
        <img src={signinImage} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
);
};

export default Signin;