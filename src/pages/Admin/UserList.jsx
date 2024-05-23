import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from '../../components/Message'

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [editableUderId, setEditableUserId] = useState(null);
  const [editableUsername, setEditableUsername] = useState("");
  const [editableUserEmail, setEditableEmail] = useState("");
  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id)=>{
    if(window.confirm("Are you sure?")){
      try {
        await deleteUser(id)
      } catch (error) {
        toast.error(error.data.message || error.message)
      }
    }
  }
  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUsername(username);
    setEditableEmail(email);
  };
  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUsername,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="p-4 ml-[5rem]">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUderId === user._id ? (
                      <div>
                        <input
                          type="text"
                          value={editableUsername}
                          onChange={(e) => setEditableUsername(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() => toggleEdit(user._id, user.username, user.email)}
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {
                      editableUderId === user._id ? (
                        <div className="flex items-center">
                          <input type="text"
                            value={editableUserEmail}
                            onChange={(e) => setEditableEmail(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          />
                          <button 
                           onClick={()=>updateHandler(user._id)}
                           className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                          ><FaCheck/></button>
                        </div>
                      ):(
                          <div className="flex items-center">
                            <p>{user.email}</p>
                            <button onClick={()=>toggleEdit(user._id,user.username,user.email)}>
                              <FaEdit className="ml-[1rem]"/>
                            </button>
                          </div>
                      )
                    }
                  </td>
                  <td className="px-4 py-2">{user.isAdmin ? (<FaCheck style={{ color : "green"}}/>) : 
                  (<FaTimes style={{ color : "red"}}/>)}</td>
                  <td className="px-4 py-2">
                    {
                      !user.isAdmin && (
                        <div className="flex">
                          <button onClick={() => deleteHandler (user._id)} className="bg-red-600 text-white px-2 py-1 ml-2 rounded-md">
                            <FaTrash />
                          </button>
                        </div>
                      )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
};

export default UserList;
