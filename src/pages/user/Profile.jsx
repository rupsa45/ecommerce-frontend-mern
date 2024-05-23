import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler=async(e)=>{
    e.preventDefault()
    if(password!==confirmPassword){
      toast.error("Password and Confirm Password does not match");
    }
    else{
      try{
        const res = await updateProfile({
          _id:userInfo._id,
          username,
          email,
          password
        }).unwrap()
        dispatch(setCredentials(res))
        toast.success("Profile Updated Successfully")
      }catch(error){
        toast.error(error?.data?.message ||  error.message)
      }
    }
  }

  return (
    <div className="container mx-auto p-2  mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4 ">
              <label className="block text-white mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="form-input p-4 rounded-sm w-full bg-gray-700"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-input p-4 rounded-sm w-full bg-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="text"
                placeholder="password"
                className="form-input p-4 rounded-sm w-full bg-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="text"
                placeholder="confirm password"
                className="form-input p-4 text-white rounded-sm w-full bg-gray-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                disabled={loadingUpdateProfile}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                {loadingUpdateProfile ? "Updating....." : "Update Profile"}
              </button>
              
              <Link
                  to="/user-orders"

                  className="text-blue-500 hover:underline"
                >
                  My Orders
                </Link>
            </div>
          </form>
          {loadingUpdateProfile && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
