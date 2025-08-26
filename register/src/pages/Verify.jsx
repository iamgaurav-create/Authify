import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from '../components/Otpbox';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) return toast.error("Please enter a valid 6-digit OTP");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/otp", { email, otp });
      toast.success(res.data.message);
      navigate("/login"); 
     } catch (err) {
    toast.error(err.response?.data?.message || "OTP verification failed");
  } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-[300px] min-w-[300px]'>
      <div className='text-center mb-[25px] border p-[10px] rounded-br-full'>
        <h1 className='pb-[3px]'>Verify Your Email</h1>
        <p>Secure Your Account</p>
      </div>

      <div>
        <p className='text-[16px] text-center'>
          OTP sent to <br />
          <span className='font-bold'>{email}</span>
        </p>
      </div>

      <OTPInput length={6} value={otp} onChange={setOtp} />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="mt-[30px] w-full py-[10px] bg-transparent text-white rounded-lg hover:bg-[#c3a7a7] transition rounded-full text-[15px] border-[#fff]"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default Verify;
