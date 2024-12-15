import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signupImage from "../../assets/Sign-up-rafiki.svg"
import useAuth from '../../Hooks/useAuth'
import toast from "react-hot-toast";
import axios from 'axios';


const Signup = () => {



    const { register, handleSubmit, formState: { errors } } = useForm();
    const {
        createUser, updateUserProfile
    } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'

    const onSubmit = (data) => {
        const { name, email, photoUrl, password, } = data;
        console.log(name, email, photoUrl, password);


        createUser(email, password)
            .then((result) => {
                console.log(result.user, "user");

                // Update user profile
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        const userData = {
                            name,
                            email,
                            photoUrl,
                            role : "user",
                            height : "",
                            weight : "",
                            age : ""
                            // email
                        };
                        // Use Axios to post user data
                        axios.post(`${import.meta.env.VITE_API_URL}/user`, userData)
                            .then(() => {
                                console.log(userData);
                                toast.success("User registered successfully!");
                                navigate(from, { replace: true });
                            })
                            .catch((error) => {
                                console.error("Error posting user data:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error updating user profile:", error);
                    });
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });

    };




    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-full max-w-3xl bg-white  shadow-lg  flex">

                <div className="bg-red-500  w-[50%]">
                    <img src={signupImage} alt="" className="w-full h-full object-cover" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-2 p-8 space-y-4 w-[50%]">
                    <h1 className="text-3xl text-center font-bold text-red-500">Sign Up</h1>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (<span className="text-red-600">Name is required</span>)}
                    </div>
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
                        <input
                            type="text"
                            name="photoUrl"
                            id="photoUrl"
                            placeholder="Photo Url"
                            className="w-full pl-10 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
                            {...register("photoUrl")}
                        />
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
                    <button type="submit" className="w-full py-2 bg-red-500 text-black rounded-md hover:bg-red-500 transition duration-300">Submit</button>
                    <p className="text-center text-sm text-black">Already have an account? <Link to="/signin" htmlFor="flip" className="text-red-500 cursor-pointer hover:underline">Sign in now</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Signup;