import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/reset-password", { token, newPassword: password });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className='min-h-[220px] min-w-[300px] '>
   
  
        <div className='text-center mb-[25px] border p-[10px] rounded-br-full'>
          <h1 className='pb-[3px]'>Reset Account </h1>
          <p>Create New Password</p>
        </div>
    <form 
    className="grid"
    onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter new password"
         className="bg-transparent rounded-[5px] text-[#fff] text-[16px] pl-[5px]  flex-1 outline-none text-[#fff]  placeholder-gray-300 focus:outline-none border-[#fff] p-[8px] ]"
        
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit"
        className=" bg-transparent border-[#fff] mt-[30px] p-[10px] text-[#fff] rounded-[10px]    hover:bg-[rgba(255,255,255,0.25)] 
             transition duration-300"
      disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
    </div>
  );
};

export default ResetPassword;
