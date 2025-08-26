import { Eye, EyeClosedIcon, EyeOff, Loader, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userAuthStore } from '../store/userAuth';
import toast from "react-hot-toast";

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password:"",
    });

    const {signup, isSignup} = userAuthStore();
    const navigate = useNavigate(); 

      const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await signup(formData, navigate);
    }
  };
  return (
    <div className='min-h-[400px] min-w-[300px] '>
        <div className='text-center mb-[25px] border p-[10px] rounded-br-full'>
          <h1 className='pb-[3px]'>SignUp</h1>
          <p>Signup To Access Account</p>
        </div>

        <form onSubmit={handleSubmit}>
         <div className="form-control">
        <label className="label">
           <span className="label-text font-[20px] text-[#fff] ">Full Name</span>
         </label>
        <div className="flex items-center bg-white/10 border border-white/20 rounded-[5px] h-[40px] px-[5px]">
           <User className="w-5 h-5 text-gray-300 mr-3 " />
           <input
             type="text"
             placeholder="Aman Kumar"
             
             className="bg-transparent text-[16px] pl-[5px]   flex-1 outline-none text-[#fff]  placeholder-gray-300 focus:outline-none border-none"
             value={formData.username}
             onChange={(e) => setFormData({...formData, username: e.target.value})}
           />
        </div>
        </div>

         <div className="form-control ">
        <label className="label">
           <span className="label-text font-[20px] text-[#fff] ">Email</span>
         </label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-[5px] h-[40px] px-[5px]">
           <Mail className="w-5 h-5 text-gray-300 mr-3 " />
           <input
             type="email"
             placeholder="aman501@gmail.com"
             className="bg-transparent text-[16px] pl-[10px]  flex-1 outline-none text-[#fff]  placeholder-gray-300 focus:outline-none border-none"
             value={formData.email}
             onChange={(e) =>setFormData({...formData, email: e.target.value}) }
           />
        </div>
        </div>


 <div className="form-control w-80">
      <label className="label">
        <span className="label-text text-[#fff]  text-[20px]">Password</span>
      </label>

     <div className="flex items-center bg-white/10 border border-white/20 rounded-[5px] h-[40px] px-[5px]">
        
        <Lock className="w-5 h-5 text-gray-300 mr-2" />

      
        <input
          type={showPassword ? "text" : "password"}
          placeholder="*********"
          className="flex-1 pl-[10px] bg-transparent text-[#fff]  placeholder-gray-300 outline-none focus:outline-none border-none"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />

      
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className=" bg-transparent border-none text-[#fff] "
        >
          {showPassword ? (
            <EyeClosedIcon className="" />
          ) : (
            <Eye  className='' />
          )}
        </button>
      </div>

<button
  type="submit"
  className="w-full mt-[20px] h-[40px] rounded-[5px] 
             bg-[rgba(255,255,255,0.15)] 
             backdrop-blur-md 
             border border-[rgba(255,255,255,0.3)] 
             text-[#fff] font-semibold 
             shadow-lg 
             hover:bg-[rgba(255,255,255,0.25)] 
             transition duration-300"
  disabled={isSignup}>
    {isSignup ? (
      <>
        <Loader className="animate-spin w-4 h-4 mr-2" />
        Loading...
      </>
    ) : (
      "Create Account"
    )}
</button>
</div>

  <div className='btn p-3 pt-[10px] flex items-center justify-center '> 
             
              <p>Already have an account ?  You can <Link className='font-bold text-[#464C4C] text-[18px] ' to="/login" >Login</Link></p>
            </div>

        </form>
       
       
    </div>
  )
}

export default Signup;