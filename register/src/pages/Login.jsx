import { Eye, EyeClosedIcon, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { userAuthStore } from '../store/userAuth';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({

      email:"",
      password:"",
    });

     const { login, isLoggingIn } = userAuthStore();

     const handleSubmit =async (e) => {
      e.preventDefault();
      login(formData);
     }

  return (
    <div className='min-h-[400px] min-w-[300px] '>
        <div className='text-center mb-[25px] border p-[10px] rounded-br-full'>
          <h1 className='pb-[3px]'>Login</h1>
          <p>Login To Access Account</p>
        </div>

        <form onSubmit={handleSubmit}> 

         <div className="form-control ">
        <label className="label">
           <span className="label-text font-[20px] text-[#fff] ">Email</span>
         </label>
          <div className="flex items-center  border border-white/20 rounded-[5px] h-[40px] px-[5px]">
           <Mail className="w-5 h-5 text-gray-300 mr-3 " />
           <input
             type="email"
             placeholder="aman501@gmail.com"
             className="bg-transparent text-[16px] pl-[5px]  flex-1 outline-none text-[#fff]  placeholder-gray-300 focus:outline-none border-none"
             value={formData.email}
             onChange={(e) => setFormData({...formData, email: e.target.value})}
           />
        </div>
        </div>


 <div className="form-control w-80">
      <label className="label">
        <span className="label-text text-[#fff]  text-[20px]">Password</span>
      </label>

     <div className="flex items-center bg-white/10 border border-white/20 rounded-[5px] h-[40px] px-[5px]">
        {/* Left icon */}
        <Lock className="w-5 h-5 text-gray-300 mr-2" />

      
        <input
          type={showPassword ? "text" : "password"}
          placeholder="*********"
          className="flex-1 text-[16px] pl-[5px] bg-transparent text-[#fff]  placeholder-gray-300 outline-none focus:outline-none border-none"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          
       />

      
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className=" bg-transparent border-none text-[#fff] "
        >
          {showPassword ? (
            <EyeClosedIcon className="w-5 h-5 text-gray-300" />
          ) : (
            <Eye className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>

      <span className='forget' >
        <Link to="/forgot-password"
        className='text-[#fff] text-[16px] float-right pt-[10px] no-underline hover:text-[#ccc]'
        >Forget Password</Link>
      </span>


<button
  type="submit"
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


</div>
   <div className='btn p-3 pt-[15px] flex items-center justify-center '> 
             
              <p>Don't have an account ?  You can <Link className='font-bold text-[#464C4C] text-[18px] ' to="/Signup" >Signup</Link></p>
            </div>

        </form>
       
       
    </div>
  )
}

export default Login;