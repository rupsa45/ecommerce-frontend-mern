import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  const submitHandler =async(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Password and Confirm Password must be same");
    }
    else{
      try{
        const res =await register({
          username,email,password
        })
        dispatch(setCredentials({...res}))
        navigate(redirect);
        toast.success("user successfully registered!")
      }catch(error){
        toast.error(error.data.message)
      }
    }
  }
  return (
    <section className="pl-[10rem] flex flex-wrap text-white">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-3xl font-bold">Register</h1>
        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              username
            </label>
            <input
              type="username"
              id="username"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              confirmPassword
            </label>
            <input
              type="confirmPassword"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {isLoading && <Loader />}
        </form>
        <div className="mt-4">
            <p className="text-white">
             Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}

                className="text-blue-500 hover:underline"
              >
                login
              </Link>
            </p>
          </div>
      </div>
    </section>
  );
};

export default Register;
