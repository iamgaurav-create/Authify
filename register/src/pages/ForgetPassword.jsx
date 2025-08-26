
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/userAuth";
import { Link } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isLoggingIn } = userAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      console.log("Forgot password response:", res.data);
      toast.success(res.data.message);
        const token = res.data.token;
      
    } catch (error) {
       
      toast.error(error.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   <div className='min-h-[220px] min-w-[300px] '>
   
     <div className='text-center mb-[25px] border p-[10px] rounded-br-full'>
          <h1 className='pb-[3px] text-[18px]'>FORGOT PASSWORD</h1>
         
        </div>
    <form  onSubmit={handleSubmit}
    className="grid">
      <input
        type="email"
         className="bg-transparent rounded-[5px] text-[#fff] text-[16px] pl-[5px]  flex-1 outline-none text-[#fff]  placeholder-gray-300 focus:outline-none border-[#fff] p-[8px] ]"
             placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}
       className=" bg-transparent border-[#fff] mt-[10px] p-[10px] text-[#fff] rounded-[10px]    hover:bg-[rgba(255,255,255,0.25)] 
             transition duration-300"
 >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>


<Link to="/login">
      <button

  className="w-full mt-[15px]  h-[40px] rounded-lg 
             bg-[rgba(255,255,255,0.15)] 
             backdrop-blur-md 
             border border-[rgba(255,255,255,0.3)] 
             text-[#fff]  font-semibold 
             shadow-lg 
             hover:bg-[rgba(255,255,255,0.25)] 
             transition duration-300
             rounded rounded-[5px]"
>
   {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
</button>
</Link>

    </form>
    </div>
</>
  );
};

export default ForgotPassword;